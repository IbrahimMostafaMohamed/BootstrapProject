


// api:  https://forkify-api.herokuapp.com/api/search?q=pizza

var tempp = 0;

async function getData(productName) {
    let res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${productName}`);
    let data = await res.json();
    let dataList = data.recipes

    display(dataList);

    var img = document.querySelectorAll(".selectt");    // NodeList     
    var imgs = Array.from(img);
    console.log(imgs);

    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener("click", function (e) {
            var getID = imgs[i].getAttribute("getID");
            console.log(getID);
            getDataById(getID)
        })
    }

}



var arr = ["pizza", "pasta", "mango", "watermelon", "salad"];
const randomIndex = Math.floor(Math.random() * arr.length);
getData(arr[randomIndex]);


var prod = document.querySelectorAll(".nav-link");
for (let i = 0; i < prod.length; i++) {
    prod[i].addEventListener("click", function () {
        getData(prod[i].getAttribute("hema"))

    })
}


function display(x) {
    var temp = "";
    for (let i = 0; i < x.length; i++) {
        temp += `
           <div class="col-md-3">
                <div class="border border-1 border-danger text-center p-2">
                    <img src="${x[i].image_url}" getID="${x[i].recipe_id}" class="w-100 selectt" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                    <h5 class="mt-2">${x[i].title.slice(0, 10)}</h5>
                    <p>${x[i].recipe_id}</p>
                </div>
            </div>
        `
    }
    document.getElementById("demo").innerHTML = temp;

}



async function getDataById(prod_Id) {
    let res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${prod_Id}`);
    let data = await res.json();
    let dataList = data.recipe.ingredients;
    let imggg = data.recipe.image_url;
    let h33 = data.recipe.title;
    console.log(imggg);

    display1(dataList, imggg, h33);

}



function display1(x, y, z) {
    var temp = `
        <img src="${y}" class="w-100">
        <h2 class="text-center">${z.slice(0, 10)}</h2>
        `;

    for (let i = 0; i < x.length; i++) {
        temp += `
           <p>${x[i]}</p>
        `
    }
    document.getElementById("modelll").innerHTML = temp;

}



