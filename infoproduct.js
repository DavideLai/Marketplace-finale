const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    

    const api = "https://striveschool-api.herokuapp.com/api/product/";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2MGE4YmEzM2ZjOTAwMTk2NTgzZGMiLCJpYXQiOjE3MDg1MjYyMjAsImV4cCI6MTcwOTczNTgyMH0.8UUHiReckxRRbuAbQu9QVI1F-RaL03XPSwXyupsgb5U";

    window.onload = showProduct();

    async function showProduct(){
        try{
            let response = await fetch(api + productId,{
                headers:{
                'Authorization': `Bearer ${key}`
                }
            });
            const data = await response.json();

            let h1 = document.querySelector('.container h5');
            let ul = document.querySelector('.container ul');
            let img = document.querySelector('.container img');

            h1.innerHTML = data.name;

            img.src = data.imageUrl;

            let liBrand = document.createElement('li');
            liBrand.innerHTML = "<b>Brand:</b> "+data.brand;

            let liDescription = document.createElement('li');
            liDescription.innerHTML = "<b>Descrizione:</b> "+data.description;

            let liPrice = document.createElement('li');
            liPrice.innerHTML = "<b>Prezzo:</b> "+data.price+"€";

            ul.append(liBrand,liDescription,liPrice);

        
        }catch (err){
                console.log(err);
        }
        
    }