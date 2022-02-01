let domain = window.location.href;
let createUserPath = 'api/users/create'
let url = domain+'api/users/getall';



let searchBtn = document.querySelector('.btn-search')

let form = document.forms[0];
let userFormEdit = document.forms[1];

let dbc = {};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    console.log(url);

    fetch(url)
        .then((response) => {

            return response.json();

        }).then((data) => {

            console.log(data);
            dbc = data;
            updateList(data);

        })
});



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

    
    data.forEach( (element, index) => {

    

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

       

        let td = [td1, td2, td3, td4];

        td1.innerText = element.name;
        td2.innerText = element.age;
        td3.innerText = element.cargo;
        td4.appendChild(createButton(index));
       

        
        // ADD <td> elements for a <tr>
        for(let i=0; i<=3; i++){
            tr.appendChild(td[i]);
        }

        // ADD <tr> to <tbody>
        list.appendChild(tr);
    });

}

// create buttons
function createButton(index) { 
     
    let div = document.createElement('div');

    let btnDel = document.createElement('button');
    let btnEdit = document.createElement('button');

    let btn = [btnDel, btnEdit];

    // set text of buttons
    btn[0].innerText = "Edit";
    btn[1].innerText = "Delete";



    btn[0].setAttribute('onclick',`setUserToEdit('${index}')`);
    btn[1].setAttribute('onclick',`deleteUser('${index}')`);

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


// let formEditUser
let updateUserURL = domain+'api/users/'


function setUserToEdit(index) {    
    
    let d = dbc[index];

    let data = {
        id: d.id,
        name: d.name,
        age: d.age,
        cargo: d.cargo,
    };


    userFormEdit[0].value = d.name;
    userFormEdit[1].value = d.age;
    userFormEdit[2].value = d.cargo;
    userFormEdit[3].value = d.id;
    
    console.log(data); 
}

function updateUser(e) {
    e.preventDefault();


    let name = userFormEdit[0].value;
    let age = userFormEdit[1].value;
    let cargo = userFormEdit[2].value;
    let id = userFormEdit[3].value;

    let data = {
        name: name,
        age: age,
        cargo: cargo,
    };

    let updateRoute = domain+`api/users/${id}`;

    console.log(updateRoute);

    fetch(updateRoute, {
        method: 'PUT',
        headers: {
            "Content-Type":"Application/json"
        },
        body: JSON.stringify(data)

    }).then(response => {

        if(response.status == 200) {
            for(let i=0; i<userFormEdit.childElementCount; i++) {
                userFormEdit[i].value = ''
            }
        }

    }).then(data => {

        console.log(data);

    }) 

}

const modalDelete = document.querySelector('.modal-delete');
const modalShadow = document.querySelector('.modal-shadow');

const confirmBtn = document.getElementById('confirmBtn');
const cancelBtn = document.getElementById('cancelBtn');

function showModalBeforeDelete() {
    modalDelete.classList.toggle('act-modal');
    modalShadow.classList.toggle('act-modal');
}

function confirmDelete() {
    return new Promise((resolve,reject) => {

        showModalBeforeDelete();

        function resolvePromise() {

            showModalBeforeDelete();

            confirmBtn.removeEventListener('click', resolvePromise);
            cancelBtn.removeEventListener('click', rejectPromise);
            modalShadow.removeEventListener('click', rejectPromise);

            resolve('promise-acepted');
        }

        function rejectPromise() {

            showModalBeforeDelete();

            cancelBtn.removeEventListener('click', rejectPromise);
            confirmBtn.removeEventListener('click', resolvePromise);
            modalShadow.removeEventListener('click', rejectPromise);

            resolve('promise-rejected');
        }

        confirmBtn.addEventListener('click', resolvePromise);
        cancelBtn.addEventListener('click', rejectPromise);
        modalShadow.addEventListener('click', rejectPromise);

        console.log('new promise threw');

    })
}


async function deleteUser(index) {


    let id = dbc[index].id

    let deleteRoute = domain+`api/users/${id}`;


    await confirmDelete().then(data => {

            if(data == 'promise-acepted'){
                fetch(deleteRoute, {
                    method: 'DELETE'
                }).then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data);
                }).catch(err => console.log(err))
            }else {
                console.log('delete user cancealed');   
            }
        })


    // fetch(deleteRoute, {
    //     method: 'PUT',
    //     headers: {
    //         "Content-Type":"Application/json"
    //     },
    //     body: JSON.stringify(data)
    
    // }).then(response => {
    
    //     return response.json();
    
    // }).then(data => {
    
    //     console.log(data);
    
    // }) 
    
    
}