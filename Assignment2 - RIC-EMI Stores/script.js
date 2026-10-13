let commentForm = document.querySelector("#comment-form");
let commentsContainer = document.querySelector("#comments-container");
let clearBtn = document.querySelector("#clear-btn");
let cartContainer = document.querySelector("#cart-container");
let totalAmount = document.querySelector("#total-amount");

function loadComments() {
    let saved = localStorage.getItem("store-comments");
    let comments = [];

    if (saved) {
        comments = JSON.parse(saved);
    }

    if (commentsContainer) {
        commentsContainer.innerHTML = "";

        if (comments.length === 0) {
            commentsContainer.innerHTML = "<p>No comments yet.</p>";
            return;
        }

        for (let i = 0; i < comments.length; i++) {
            let div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = "<strong>" + comments[i].name + "</strong><p>" + comments[i].comment + "</p>";
            commentsContainer.appendChild(div);
        }
    }
}

if (commentForm) {
    commentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let nameInput = document.querySelector("#name-input");
        let commentInput = document.querySelector("#comment-input");

        if (nameInput.value === "" || commentInput.value === "") {
            alert("Please fill in your name and comment");
            return;
        }

        let saved = localStorage.getItem("store-comments");
        let comments = [];

        if (saved) {
            comments = JSON.parse(saved);
        }

        let newComment = {
            name: nameInput.value,
            comment: commentInput.value
        };

        comments.push(newComment);
        localStorage.setItem("store-comments", JSON.stringify(comments));

        nameInput.value = "";
        commentInput.value = "";

        loadComments();
    });
}

if (clearBtn) {
    clearBtn.addEventListener("click", function() {
        let confirmClear = confirm("Are you sure you want to clear all comments?");

        if (confirmClear) {
            localStorage.removeItem("store-comments");
            if (commentsContainer) {
                commentsContainer.innerHTML = "<p>No comments yet.</p>";
            }
        }
    });
}

function loadCart() {
    let saved = localStorage.getItem("store-cart");
    let cart = [];

    if (saved) {
        cart = JSON.parse(saved);
    }

    if (cartContainer) {
        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            if (totalAmount) {
                totalAmount.textContent = "0";
            }
            return;
        }

        let total = 0;

        for (let i = 0; i < cart.length; i++) {
            let div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = "<span>" + cart[i].name + " - &#8358;" + cart[i].price.toLocaleString() + "</span>";
            let removeBtn = document.createElement("button");
            removeBtn.className = "remove-btn";
            removeBtn.textContent = "Remove";
            removeBtn.setAttribute("data-index", i);
            removeBtn.addEventListener("click", function() {
                removeFromCart(i);
            });
            div.appendChild(removeBtn);
            cartContainer.appendChild(div);
            total = total + cart[i].price;
        }

        if (totalAmount) {
            totalAmount.textContent = total.toLocaleString();
        }
    }
}

function addToCart(name, price) {
    let saved = localStorage.getItem("store-cart");
    let cart = [];

    if (saved) {
        cart = JSON.parse(saved);
    }

    let item = {
        name: name,
        price: price
    };

    cart.push(item);
    localStorage.setItem("store-cart", JSON.stringify(cart));
    alert(name + " has been added to your cart");
    loadCart();
}

function removeFromCart(index) {
    let saved = localStorage.getItem("store-cart");
    let cart = [];

    if (saved) {
        cart = JSON.parse(saved);
    }

    cart.splice(index, 1);
    localStorage.setItem("store-cart", JSON.stringify(cart));
    loadCart();
}

function clearCart() {
    let confirmClear = confirm("Are you sure you want to clear your cart?");

    if (confirmClear) {
        localStorage.removeItem("store-cart");
        loadCart();
    }
}

loadComments();
loadCart();
