let commentForm = document.querySelector("#comment-form");
let commentsContainer = document.querySelector("#comments-container");
let clearBtn = document.querySelector("#clear-btn");

function loadComments() {
    let saved = localStorage.getItem("comments");
    let comments = [];

    if (saved) {
        comments = JSON.parse(saved);
    }

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

if (commentForm) {
    commentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let nameInput = document.querySelector("#name-input");
        let commentInput = document.querySelector("#comment-input");

        if (nameInput.value === "" || commentInput.value === "") {
            alert("Please fill in your name and comment");
            return;
        }

        let saved = localStorage.getItem("comments");
        let comments = [];

        if (saved) {
            comments = JSON.parse(saved);
        }

        let newComment = {
            name: nameInput.value,
            comment: commentInput.value
        };

        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));

        nameInput.value = "";
        commentInput.value = "";

        loadComments();
    });
}

if (clearBtn) {
    clearBtn.addEventListener("click", function() {
        let confirmClear = confirm("Are you sure you want to clear all comments?");

        if (confirmClear) {
            localStorage.removeItem("comments");
            commentsContainer.innerHTML = "<p>No comments yet.</p>";
        }
    });
}

loadComments();
