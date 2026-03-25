var PName = document.getElementById("pName");
var PPrice = document.getElementById("pPrice");
var PCategory = document.getElementById("pCategory");
var PDescription = document.getElementById("pDesc");
var pSearch = document.getElementById("pSearch");

var btnAdd = document.getElementById("btnAdd");
var btnClear = document.getElementById("btnclear");
var btnUpdate = document.getElementById("btnUpdate");

var ProductList = [];
ProductList = localStorage.getItem("Products");
if (ProductList == null) ProductList = [];
else {
  ProductList = JSON.parse(ProductList);
  display();
}

btnAdd.addEventListener("click", function () {
  var Product = {
    Name: PName.value,
    Price: PPrice.value,
    Category: PCategory.value,
    Description: PDescription.value,
  };

  ProductList.push(Product);
  console.log(ProductList);

  localStorage.setItem("Products", JSON.stringify(ProductList));
  display();
});

function display() {
  var temp = "";
  for (let i = 0; i < ProductList.length; i++) {
    temp += ` <tr>
            <td>${i + 1}</td>
            <td>${ProductList[i].Name}</td>
            <td>${ProductList[i].Price}</td>
            <td>${ProductList[i].Category}</td>
            <td>${ProductList[i].Description}</td>
            <td><button class="btn btn-warning" onclick="UpdateProduct(${i})">Update</button></td>
            <td><button class="btn btn-danger"  onclick="DeleteProduct(${i})">Delete</button></td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = temp;
}

btnClear.addEventListener("click", function () {
  PName.value = "";
  PPrice.value = "";
  PDescription.value = "";
});

function DeleteProduct(index) {
  ProductList.splice(index, 1);
  localStorage.setItem("Products", JSON.stringify(ProductList));
  display();
}

pSearch.addEventListener("keyup", function () {
  var temp = "";
  for (let i = 0; i < ProductList.length; i++) {
    if (
      ProductList[i].Name.toLowerCase().includes(pSearch.value.toLowerCase()) ||
      ProductList[i].Category.toLowerCase().includes(
        pSearch.value.toLowerCase(),
      )
    ) {
      temp += ` <tr>
            <td>${i + 1}</td>
            <td>${ProductList[i].Name.toLowerCase().replace(pSearch.value.toLowerCase(), `<span class="fw-bold text-danger">${pSearch.value}</span>`)}</td>
            <td>${ProductList[i].Price}</td>
            <td>${ProductList[i].Category.toLowerCase().replace(pSearch.value.toLowerCase(), `<span class="fw-bold text-danger">${pSearch.value}</span>`)}</td>
            <td>${ProductList[i].Description}</td>
            <td><button class="btn btn-warning" onclick="UpdateProduct(${i})">Update</button></td>
            <td><button class="btn btn-danger"  onclick="DeleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = temp;
});

function UpdateProduct(index) {
  PName.value = ProductList[index].Name;
  PPrice.value = ProductList[index].Price;
  PCategory.value = ProductList[index].Category;
  PDescription.value = ProductList[index].Description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
  btnUpdate.addEventListener("click", function () {
    ProductList[index].Name = PName.value;
    ProductList[index].Price = PPrice.value;
    ProductList[index].Category = PCategory.value;
    ProductList[index].Description = PDescription.value;

    localStorage.setItem("Products", JSON.stringify(ProductList));
    display();
    btnAdd.classList.remove("d-none");
    btnUpdate.classList.add("d-none");
  });
}

PName.addEventListener("keydown", function () {
  if (PName.value.length < 2) {
    PName.classList.add("is-invalid");
    PName.classList.remove("is-valid");
  } else {
    PName.classList.add("is-valid");
    PName.classList.remove("is-invalid");
  }
});

PPrice.addEventListener("keydown", function () {
  if (Number(PPrice.value) < 10) {
    PPrice.classList.add("is-invalid");
    PPrice.classList.remove("is-valid");
  } else {
    PPrice.classList.add("is-valid");
    PPrice.classList.remove("is-invalid");
  }
});


