const btnBack = document.querySelector('#btnBack')

window.addEventListener('scroll', () => {
    const heightPage = window.scrollY
    if (heightPage >= 600) {
        btnBack.style.display = 'block'
    } else btnBack.style.display = 'none'
    console.log(heightPage)
});

btnBack.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})