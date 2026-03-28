let cartItems = JSON.parse(localStorage.getItem("userCart")) || [];

function displayCart() {
  const container = document.getElementById("cart-items-container");
  const emptyMsg = document.getElementById("empty-msg");

  if (cartItems.length === 0) {
    container.innerHTML = "";
    emptyMsg.classList.remove("d-none");
    return;
  }

  emptyMsg.classList.add("d-none");
  container.innerHTML = cartItems
    .map(
      (item, index) => `
                <div class="col-12 cart-card" id="item-${index}">
                    <div class="card border-0 shadow-sm p-3 mb-2 rounded-4">
                        <div class="row align-items-center">
                            <div class="col-3 col-md-2">
                                <img src="${item.img}" class="img-fluid rounded-3" style="height: 80px; width: 100%; object-fit: cover;">
                            </div>
                            <div class="col-6 col-md-8">
                                <h5 class="mb-1 fw-bold text-truncate">${item.title}</h5>
                                <p class="text-muted small mb-0">ID: ${item.id.slice(0, 8)}</p>
                            </div>
                            <div class="col-3 col-md-2 text-end">
                                <button onclick="removeItem(${index})" class="btn btn-light text-danger rounded-circle border">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `,
    )
    .join("");
}

function removeItem(index) {
  const element = document.getElementById(`item-${index}`);
  element.classList.add("remove-animation"); 

  setTimeout(() => {
    cartItems.splice(index, 1);
    localStorage.setItem("userCart", JSON.stringify(cartItems));
    displayCart();
  }, 400);
}

function clearAll() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cartItems = [];
    localStorage.setItem("userCart", JSON.stringify(cartItems));
    displayCart();
  }
}

displayCart();
