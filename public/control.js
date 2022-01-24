let domain = window.location.href;
let createUserPath = 'api/users/create'
let url = domain+'api/users/getall';

let searchBtn = document.querySelector('.btn-search')


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(url);

    fetch(url)
        .then((response) => {

            return response.json();

        }).then((data) => {

            console.log(data);
            updateList(data);

        })
});


let form = document.forms[0];
let createUserURL = domain+createUserPath;

form[4].addEventListener('click', (e) => {

    e.preventDefault();

    console.log(createUserURL)

    let user = form[0].value;
    let age = form[1].value;
    let cargo = form[2].value;

    console.log(`user: ${user} \n age: ${age} \n cargo: ${cargo} \n`)

    let data = {
        user: user,
        age: age,
        cargo: cargo
    }
 
    
    fetch(createUserURL, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)

    }).then((data) => {

        if(data.ok){
            form[0].value = '';
            form[1].value = '';
            form[2].value = '';
        }

        return data.json();

    }).then((data) => {
        // console.log(data);

        // if()
    })
    
});

let list = document.querySelector('.table-body');

function updateList(data){

    
    data.forEach( element => {
        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

       

        let td = [td1, td2, td3, td4];

        td1.innerText = element.name;
        td2.innerText = element.age;
        td3.innerText = element.cargo;
        td4.appendChild(createButton(element.id));
       

        
        // ADD <td> elements for a <tr>
        for(let i=0; i<=3; i++){
            tr.appendChild(td[i]);
        }

        // ADD <tr> to <tbody>
        list.appendChild(tr)
    });

}

// create buttons
function createButton (id){
     
    let div = document.createElement('div');

    let btnDel = document.createElement('button');
    let btnEdit = document.createElement('button');
    let btn = [btnDel, btnEdit];
    // set text of buttons
    btn[0].innerText = "Edit";
    btn[1].innerText = "Delete";


    let ids = id;

    btn[0].setAttribute('onclick',`updateUser('${ids}')`);

    // add standard classes on buttons
    for (let i=0; i<btn.length; i++) {
         btn[i].classList.add('btn');
         btn[i].classList.add('btn-actions');
    }

    // add special classe for delete button
    btn[1].classList.add('bg-danger');

    for(let i=0; i< btn.length; i++) {
        div.appendChild(btn[i]);
    }

    return div;

}

let updateUserURL = domain+'api/users/'

function updateUser(id) {    
    let updateUser = updateUserURL+`${id}`
    console.log(updateUser);

    fetch(updateUser, {
        method: 'PUT',
        headers: {
            "Content-Type":"Application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }) 

    
}

function deleteUser() {

}