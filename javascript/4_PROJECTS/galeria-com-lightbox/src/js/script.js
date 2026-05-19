const boxImages = document.querySelectorAll('.gallery-item')
const imageContrast = document.querySelector('.lightbox-image')
const lightBox = document.querySelector('.lightbox')
const btnBack = document.querySelector('.lightbox-close')

boxImages.forEach(box => {
    box.addEventListener('click', () => {
        const imgClick = box.querySelector('img')
        imageContrast.src = imgClick.src
        lightBox.style.display = 'flex'
        lightBox.style.opacity = '1'
    })
})

btnBack.addEventListener('click', () => {
    lightBox.style.opacity = '0'
    setTimeout(() => {
        lightBox.style.display = 'none'
    }, 300)
})