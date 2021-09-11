console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;
    const messageOne = document.querySelector('#message-1');
    const messageTwo = document.querySelector('#message-2');

    messageOne.textContent = 'Loading...'; 
    messageTwo.textContent = '';

    //Fetch is a client side function. It only works in the front.
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                return;
            }

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        });
    });
});