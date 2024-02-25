const api = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiMWE0NGQ3ODc1ZDAwMTk0NDJhMzkiLCJpYXQiOjE3MDg4OTA1MTMsImV4cCI6MTcxMDEwMDExM30.fYFjc54n6feb829GnRq9kf6L-C07OcV2u1iK8bijeqA ";

window.onload = getProducts();

async function getProducts(){
    document.querySelector('.products-list').innerHTML = "";
    try{
        const response = await fetch(api,{
            headers:{
                'Authorization': `Bearer ${key}`
            }
        })
        let data = await response.json();
        console.log(data);
        data.forEach(element => {
            createProduct(element);
        });
    }
    catch(error){
        console.log(error);
    }
}

async function sendProducts(){

    let nameP = document.getElementById('name').value;
    let descriptionP = document.getElementById('description').value;
    let price = document.getElementById('price').value;
    let brand = document.getElementById('brand').value;
    let image = document.getElementById('image').value;


    if(nameP == "" || descriptionP == "" || price == ""|| brand== "" || image == "") {
        alert("Si prega di compilare tutti i campi!");
        return
    }

    let prodotto = {"name": nameP, "description": descriptionP, "price": price, "brand": brand, "imageUrl": image};

    try{
        await fetch(api, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify(prodotto),
        });

        getProducts();
    }
    catch(error) {
        console.log(error);
    }
}
    

function createProduct({name, description, brand, price, imageUrl, _id}){
    let tr = document.createElement('tr');

    let tdName = document.createElement('td');
    tdName.innerHTML = name;
    tr.appendChild(tdName); 

    let tdDescription = document.createElement('td');
    tdDescription.innerHTML = description;
    tr.appendChild(tdDescription);

    let tdPrice = document.createElement('td');
    tdPrice.innerHTML = price;
    tr.appendChild(tdPrice);

    let tdBrand = document.createElement('td');
    tdBrand.innerHTML = brand;
    tr.appendChild(tdBrand);

    let delButton = document.createElement('a');
    delButton.innerText = "Elimina";
    delButton.classList.add('btn', 'btn-danger', 'btn-sm');
    
    delButton.addEventListener( 'click' , ()=>{
        deleteProduct(_id);
    });

    tr.appendChild(delButton);

    let setButton = document.createElement('a');
    setButton.innerText = "Modifica";
    setButton.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2');
    
    setButton.addEventListener( 'click' , ()=>{
        setButton.href = "edit.html?id=" + _id;
    });

    tr.appendChild(setButton);



    document.querySelector('.products-list').appendChild(tr);
}

async function deleteProduct(id){

    await fetch(api + id, {
        method: "DELETE",
        headers:{
            'Authorization': `Bearer ${key}`,
            'Content-Type':'application/json',
        },
    });
    getProducts();
}



