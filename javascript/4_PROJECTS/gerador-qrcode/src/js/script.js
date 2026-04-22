const urlInput = document.querySelector('#inUrl')
const boxRes = document.querySelector('.qrcode-img')
const btnQr = document.querySelector('#btnQrCode')

btnQr.addEventListener('click', async () => {
    try {
        const urlUser = urlInput.value

        if (!urlUser) {
            boxRes.textContent = 'A URL não pode estar vazia.'
            boxRes.style.color = 'Red'
            urlInput.value = ''
            return
        }

        btnQr.disabled = true
        btnQr.textContent = 'Carregando...'
        boxRes.textContent = 'Gerando...'
        boxRes.classList.remove('border-qr')

        const URL_API = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(urlUser)}&size=200x200`

        const img = document.createElement('img')
        img.src = URL_API
        img.alt = 'QR Code para a URL do usuario'
        
        img.onload = () => {
            boxRes.textContent = ''
            boxRes.append(img)

            setTimeout(() => {
                img.classList.add('show')
                boxRes.classList.add('border-qr')
            }, 50)

            btnQr.disabled = false
            btnQr.textContent = 'Gerar QR Code'
        }

    } catch (err) {
        console.error('Ocorreu um erro:', err)
    }
})
