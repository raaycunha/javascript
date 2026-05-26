const allImages = document.querySelectorAll('.image-game')

const restartGame = () => {
    imagesGenerated = []
    preloadedImages = []
    hitsCard = 0
    lastCard = -1
    allImages.forEach(image => {
        image.src = 'src/assets/card-back.png'
    })
    generatedImages()
}

const generatedImages = () => {
    while(imagesGenerated.length < 8) {
        let idImage = Math.floor(Math.random() * 300)
        if (!imagesGenerated.includes(idImage)) {
            imagesGenerated.push(idImage)
            imagesGenerated.push(idImage)
        }
    }
    imagesGenerated.sort(() => Math.random() - 0.5)
    for (const id of imagesGenerated) {
        const imgReal = new Image()
        imgReal.src = `https://picsum.photos/id/${id}/220/250`
        imgReal.classList.add('image-game')
        imgReal.dataset.id = id
        preloadedImages.push(imgReal)
    }
}

const validatorImg = (imgBefore, imgClick, imgApi, idImg) => {
    if (lastCard === -1) {
        imgClick.src = imgApi.src
        lastCard = idImg
        return
    } 
    if (lastCard !== idImg) {
        imgClick.src = imgApi.src
        document.querySelector('.main-container').classList.add('lock-click')
        setTimeout(() => {
            imgClick.src = 'src/assets/card-back.png'
            imgBefore.src = 'src/assets/card-back.png'
            lastCard = -1
            document.querySelector('.main-container').classList.remove('lock-click')
            return
        }, 1000)
    }
    if (lastCard === idImg) {
        imgClick.src = imgApi.src
        lastCard = -1
        hitsCard++
        imgBefore = ''
        setTimeout(() => {
            if (hitsCard === 4) {
                alert('Parabéns você ganhou!')
                restartGame()
                return
            }
        }, 500)
        return
    }
}

let preloadedImages = []
let imgBefore = ''
let imagesGenerated = []
let hitsCard = 0
let lastCard = -1

generatedImages()

allImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        try {
            const imgReal = preloadedImages[index]
            const idImage = imgReal.dataset.id
            validatorImg(imgBefore, image, imgReal, idImage)
            imgBefore = image
        } catch (err) {
            alert('Erro ao gerar imagem!')
            console.error('Erro detalhado:', err)
        }
    })
})