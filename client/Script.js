const postsContainer =
    document.getElementById("postsContainer");

const postForm =
    document.getElementById("postForm");


// =====================================
// BLOG DISPLAY SETTINGS
// =====================================

let allPosts = [];

let visiblePosts = 6;


// =====================================
// GET ALL POSTS
// =====================================

async function getPosts() {

    try {

        const response =
            await fetch("http://localhost:3000/posts");


        if (!response.ok) {

            throw new Error(
                "Could not fetch posts"
            );

        }


        const posts =
            await response.json();


        allPosts = posts;


        displayPosts();


    } catch (error) {

        console.error(
            "Error getting posts:",
            error
        );

    }

}


// =====================================
// DISPLAY POSTS
// =====================================

function displayPosts() {

    postsContainer.innerHTML = "";


    if (allPosts.length === 0) {

        postsContainer.innerHTML = `
            <p>No blogs available yet.</p>
        `;

        return;

    }


    // Show only the number
    // of posts we want

    const postsToShow =
        allPosts.slice(0, visiblePosts);


    postsToShow.forEach(
        (post, index) => {


        const postCard =
            document.createElement("div");


        postCard.className =
            "post-card";


        postCard.innerHTML = `

            <div class="post-number">
                ${index + 1}
            </div>


            <h3>
                ${post.title}
            </h3>


            <p class="author">
                By ${post.author || "Unknown"}
            </p>


            <p class="post-content">
                ${post.content}
            </p>


            <div class="post-buttons">


                <button
                    class="read-button"
                    onclick="readPost(${post.id})"
                >
                    Read Blog
                </button>


                <button
                    class="edit-button"
                    onclick="editPost(${post.id})"
                >
                    Edit
                </button>


                <button
                    class="delete-button"
                    onclick="deletePost(${post.id})"
                >
                    Delete
                </button>


            </div>

        `;


        postsContainer.appendChild(
            postCard
        );


    });


    // =================================
    // READ MORE BUTTON
    // =================================

    if (visiblePosts < allPosts.length) {


        const readMoreButton =
            document.createElement("button");


        readMoreButton.className =
            "read-more-button";


        readMoreButton.textContent =
            "Read More";


        readMoreButton.onclick =
            function () {

                visiblePosts += 6;

                displayPosts();

            };


        postsContainer.appendChild(
            readMoreButton
        );


    }

}


// =====================================
// CREATE POST
// =====================================

postForm.addEventListener(
    "submit",
    async function (event) {


    event.preventDefault();


    const title =
        document
            .getElementById("title")
            .value
            .trim();


    const author =
        document
            .getElementById("author")
            .value
            .trim();


    const content =
        document
            .getElementById("content")
            .value
            .trim();


    if (!title || !author || !content) {

        alert(
            "Please fill in all fields."
        );

        return;

    }


    const newPost = {

        title: title,

        author: author,

        content: content

    };


    try {


        const response =
            await fetch(
                "http://localhost:3000/posts",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(newPost)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Could not create post"
            );

        }


        const createdPost =
            await response.json();


        console.log(
            "Created:",
            createdPost
        );


        alert(
            "Blog created successfully!"
        );


        postForm.reset();


        // Get the updated posts

        await getPosts();


        // Scroll to blogs

        document
            .getElementById("blogs")
            .scrollIntoView({
                behavior: "smooth"
            });


    } catch (error) {


        console.error(
            "Error creating post:",
            error
        );


        alert(
            "Something went wrong!"
        );


    }

});


// =====================================
// DELETE POST
// =====================================

async function deletePost(id) {


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this blog?"
        );


    if (!confirmDelete) {

        return;

    }


    try {


        const response =
            await fetch(
                `http://localhost:3000/posts/${id}`,
                {

                    method: "DELETE"

                }
            );


        if (!response.ok) {

            throw new Error(
                "Could not delete post"
            );

        }


        alert(
            "Blog deleted successfully!"
        );


        await getPosts();


    } catch (error) {


        console.error(
            "Error deleting post:",
            error
        );


        alert(
            "Could not delete the blog."
        );


    }

}


// =====================================
// EDIT POST
// =====================================

async function editPost(id) {


    const title =
        prompt(
            "Enter new title:"
        );


    if (title === null) {

        return;

    }


    const author =
        prompt(
            "Enter author:"
        );


    if (author === null) {

        return;

    }


    const content =
        prompt(
            "Enter new content:"
        );


    if (content === null) {

        return;

    }


    if (
        !title.trim() ||
        !author.trim() ||
        !content.trim()
    ) {

        alert(
            "All fields are required."
        );

        return;

    }


    const updatedPost = {

        title:
            title.trim(),

        author:
            author.trim(),

        content:
            content.trim()

    };


    try {


        const response =
            await fetch(
                `http://localhost:3000/posts/${id}`,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            updatedPost
                        )

                }
            );


        if (!response.ok) {

            throw new Error(
                "Could not update post"
            );

        }


        alert(
            "Blog updated successfully!"
        );


        await getPosts();


    } catch (error) {


        console.error(
            "Error updating post:",
            error
        );


        alert(
            "Could not update the blog."
        );


    }

}


// =====================================
// READ FULL BLOG
// =====================================

function readPost(id) {


    const post =
        allPosts.find(
            post => post.id === id
        );


    if (!post) {

        return;

    }


    const blogReader =
        document.getElementById(
            "blogReader"
        );


    blogReader.innerHTML = `

        <button
            class="back-button"
            onclick="closeBlogReader()"
        >
            ← Back to Blogs
        </button>


        <article class="full-blog">


            <h1>
                ${post.title}
            </h1>


            <p class="full-blog-author">

                By ${post.author || "Unknown"}

            </p>


            <div class="full-blog-content">

                ${post.content}

            </div>


        </article>

    `;


    // Hide blog list

    document
        .getElementById("blogs")
        .style.display = "none";


    // Show reader

    blogReader.style.display =
        "block";


    // Scroll to reader

    blogReader.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================
// CLOSE BLOG READER
// =====================================

function closeBlogReader() {


    document
        .getElementById("blogReader")
        .style.display =
            "none";


    document
        .getElementById("blogs")
        .style.display =
            "block";


    document
        .getElementById("blogs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// =====================================
// LOAD POSTS WHEN PAGE OPENS
// =====================================

getPosts();