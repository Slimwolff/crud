let url = window.location.href + '';
let btn = document.querySelector('.btn');


btn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(url);

    fetch(url)
        .then((response) => {

            return response.json();

        }).then((data) => {

            console.log(data);

        })
});




