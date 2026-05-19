const clockHours = document.querySelector('#clockHours')

const updateClock = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const hr = String(hours).padStart(2, '0')
    const min = String(minutes).padStart(2, '0')
    const sec = String(seconds).padStart(2, '0')

    clockHours.textContent = `${hr}:${min}:${sec}`
}

updateClock()

setInterval(updateClock, 1000)