const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    const loc = searchItem.value
    e.preventDefault()


    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + loc).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = (data.location)
                messageTwo.textContent = (data.forecast)
            }
        })
    })
})