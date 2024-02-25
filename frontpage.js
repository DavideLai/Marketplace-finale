const api = "https://striveschool-api.herokuapp.com/api/product/";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRiMWE0NGQ3ODc1ZDAwMTk0NDJhMzkiLCJpYXQiOjE3MDg4OTA1MTMsImV4cCI6MTcxMDEwMDExM30.fYFjc54n6feb829GnRq9kf6L-C07OcV2u1iK8bijeqA ";
let containerProducts = document.getElementById('containerProducts');


window.onload = getProducts();

async function getProducts(){
    try{
        const response =  await fetch(api, {
            headers:{
                'Authorization': `Bearer ${key}`
            }  
        })
        const data = await response.json();

        data.forEach(element => {
            getProduct(element);
        });
    }catch (err){
        console.log(err);
    }

}
function getProduct({name, brand, price, imageUrl, _id}){
    let colProduct = document.createElement('div');
    colProduct.classList.add('col-10', 'col-sm-5', 'col-md-3', 'mb-3');

    let productBox = document.createElement('div');
    productBox.classList.add('card', 'text-center');

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = imageUrl;

    let bodyCard = document.createElement('div');
    bodyCard.classList.add('card-body');

    let productTitle = document.createElement('h6');
    productTitle.innerText = name;
    console.log(name);

    let productBrand = document.createElement('p');
    productBrand.innerText = brand;
    console.log(brand);

    let productPrice = document.createElement('p');
    productPrice.innerText = price+'€';

    let infoButton = document.createElement('a');
    infoButton.classList.add('btn', 'btn-secondary', 'm-2');
    infoButton.innerText = 'Ottieni informazioni';

    infoButton.addEventListener('click', () =>{
        infoButton.href = "infoProduct.html?id=" + _id;
    })

    bodyCard.append(productTitle, productBrand, productPrice, infoButton);
    productBox.append(img, bodyCard);
    colProduct.appendChild(productBox);
    containerProducts.appendChild(colProduct);
}
