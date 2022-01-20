let domain = window.location.href;
const url = domain+'api/users/getall';



btn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(url);

    fetch(url)
        .then((response) => {

            return response.json();

        }).then((data) => {

            console.log(data);

            // data.forEach(element => {
            //     console.log(element.name);
            // });

        })
});




