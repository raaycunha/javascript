const containerColor = document.querySelector('.container-colors')
const btnGenerate = document.querySelector('#btnGenerate')

const rgbToHex = (r, g, b) => {
    const toHex = (c) => c.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const createHtml = (colors) => {
    containerColor.innerHTML = ''
    colors.forEach((color) => {
        const [r, g, b] = color

        const box = document.createElement('div')
        box.classList.add('box-color')
        
        const cardColor = document.createElement('div')
        cardColor.style.backgroundColor = `rgba(${r}, ${g}, ${b})`
        cardColor.classList.add('color')

        const hexCode = rgbToHex(r, g, b);

        const colorNum = document.createElement('span')
        colorNum.classList.add('color-num')
        colorNum.textContent = hexCode

        box.append(cardColor, colorNum)
        containerColor.append(box)
    })
}

btnGenerate.addEventListener('click', async () => {
    try {
        btnGenerate.disabled = true
        btnGenerate.textContent = 'Gerando...'

        const dados = { model: 'default' }

        const response = await fetch('http://colormind.io/api/', {
            method: 'POST',
            body: JSON.stringify(dados)
        })

        if (response.ok) {
            const data = await response.json()
            createHtml(data.result)
        }
    } catch (err) {
        alert('Erro ao se conectar com a API.')
        console.error('Erro detalhado:', err)
    } finally {
        btnGenerate.disabled = false
        btnGenerate.textContent = 'Gerar nova paleta'
    }
})