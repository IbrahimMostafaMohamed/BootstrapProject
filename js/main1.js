

// api:  https://forkify-api.herokuapp.com/api/search?q=pizza

let cartItems = JSON.parse(localStorage.getItem('userCart')) || [];
const cartCounter = document.getElementById('cart-counter');

if (cartCounter) {
    cartCounter.innerText = cartItems.length;
}

async function getData(productName) {
    let res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${productName}`);
    let data = await res.json();
    let dataList = data.recipes;

    display(dataList);
}

function display(x) {
    var temp = "";
    for (let i = 0; i < x.length; i++) {
        temp += `
            <div class="col-md-3 p-2">
                <div class="card h-100 border-0 shadow-sm text-center p-2 rounded-3">
                    <img src="${x[i].image_url}" getID="${x[i].recipe_id}" class="w-100 selectt rounded-2" 
                         data-bs-toggle="modal" data-bs-target="#exampleModal" 
                         style="height:180px; object-fit:cover; cursor:pointer">
                    
                    <div class="card-body p-2 d-flex flex-column">
                        <h6 class="mt-2 fw-bold text-dark text-truncate">${x[i].title}</h6>
                        <p class="text-muted small mb-3">ID: ${x[i].recipe_id.slice(0, 5)}...</p>
                        
                        <div class="mt-auto">
                            <button onclick="addToCart('${x[i].recipe_id}', '${x[i].title.replace(/'/g, "")}', '${x[i].image_url}')" 
                                    class="btn btn-success btn-sm w-100 mb-2 fw-bold">
                                <i class="fas fa-cart-plus me-1"></i> Add to Cart
                            </button>
                            
                            <button onclick="getDataById('${x[i].recipe_id}')" 
                                    class="btn btn-outline-success btn-sm w-100 fw-bold" 
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Details & Ingredients
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    document.getElementById("demo").innerHTML = temp;

    rebindImages();
}

function rebindImages() {
    var imgs = document.querySelectorAll(".selectt");
    imgs.forEach(img => {
        img.addEventListener("click", function () {
            var getID = this.getAttribute("getID");
            getDataById(getID);
        });
    });
}

async function getDataById(prod_Id) {
    let res = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${prod_Id}`);
    let data = await res.json();
    let dataList = data.recipe.ingredients;
    let imggg = data.recipe.image_url;
    let h33 = data.recipe.title;

    display1(dataList, imggg, h33);
}

function display1(x, y, z) {
    var temp = `
        <img src="${y}" class="w-100 rounded mb-3" style="max-height:300px; object-fit:cover;">
        <h4 class="text-center fw-bold text-success mb-3">${z}</h4>
        <ul class="list-group list-group-flush">
    `;

    for (let i = 0; i < x.length; i++) {
        temp += `<li class="list-group-item small"><i class="fas fa-check text-success me-2"></i>${x[i]}</li>`;
    }
    
    temp += `</ul>`;
    document.getElementById("modelll").innerHTML = temp;
}

function addToCart(id, title, img) {
    const item = { id, title, img };
    cartItems.push(item);
    
    localStorage.setItem('userCart', JSON.stringify(cartItems));
    
    if (cartCounter) {
        cartCounter.innerText = cartItems.length;
    }
    
    console.log("Added to cart: " + title);
}

var categories = ["pizza", "pasta", "mango", "watermelon", "salad"];
const randomCat = categories[Math.floor(Math.random() * categories.length)];
getData(randomCat);

var navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); 
        let category = this.getAttribute("hema");
        if(category) getData(category);
    });
});




