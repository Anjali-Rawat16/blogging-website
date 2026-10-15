const API_URL = "https://blogging-website-1-m94s.onrender.com/posts";

const postsContainer = document.getElementById("postsContainer");
const postForm = document.getElementById("postForm");

let allPosts = [];
let visiblePosts = 6;

// =====================================
// GET ALL POSTS
// =====================================

async function getPosts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not fetch posts");
        }

        allPosts = await response.json();
        displayPosts();

    } catch (error) {
        console.error("Error getting posts:", error);

        if (postsContainer) {
            postsContainer.innerHTML =
                "<p>Could not load blogs. Please refresh and try again.</p>";
        }
    }
}

// =====================================
// DISPLAY POSTS
// =====================================

function displayPosts() {
    if (!postsContainer) return;

    postsContainer.innerHTML = "";

    if (allPosts.length === 0) {
        postsContainer.innerHTML = "<p>No blogs available yet.</p>";
        return;
    }

    const postsToShow = allPosts.slice(0, visiblePosts);

    postsToShow.forEach((post, index) => {
        const postCard = document.createElement("div");
        postCard.className = "post-card";

        const number = document.createElement("div");
        number.className = "post-number";
        number.textContent = index + 1;

        const title = document.createElement("h3");
        title.textContent = post.title || "Untitled";

        const author = document.createElement("p");
        author.className = "author";
        author.textContent = `By ${post.author || "Unknown"}`;

        const content = document.createElement("p");
        content.className = "post-content";
        content.textContent = post.content || "";

        const buttons = document.createElement("div");
        buttons.className = "post-buttons";

        const readButton = document.createElement("button");
        readButton.className = "read-button";
        readButton.textContent = "Read Blog";
        readButton.addEventListener("click", () => readPost(post._id));

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editPost(post._id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deletePost(post._id));

        buttons.append(readButton, editButton, deleteButton);
        postCard.append(number, title, author, content, buttons);
        postsContainer.appendChild(postCard);
    });

    if (visiblePosts < allPosts.length) {
        const readMoreButton = document.createElement("button");
        readMoreButton.className = "read-more-button";
        readMoreButton.textContent = "Read More";

        readMoreButton.addEventListener("click", () => {
            visiblePosts += 6;
            displayPosts();
        });

        postsContainer.appendChild(readMoreButton);
    }
}

// =====================================
// CREATE POST
// =====================================

if (postForm) {
    postForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const content = document.getElementById("content").value.trim();

        if (!title || !author || !content) {
            alert("Please fill in all fields.");
            return;
        }

        const newPost = { title, author, content };

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });

            if (!response.ok) {
                throw new Error("Could not create post");
            }

            await response.json();

            alert("Blog created successfully!");
            postForm.reset();

            visiblePosts = Math.max(visiblePosts, 6);
            await getPosts();

            const blogsSection = document.getElementById("blogs");
            if (blogsSection) {
                blogsSection.scrollIntoView({ behavior: "smooth" });
            }

        } catch (error) {
            console.error("Error creating post:", error);
            alert("Could not create blog. Please try again.");
        }
    });
}

// =====================================
// DELETE POST
// =====================================

async function deletePost(id) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete post");
        }

        alert("Blog deleted successfully!");
        await getPosts();

    } catch (error) {
        console.error("Error deleting post:", error);
        alert("Could not delete the blog.");
    }
}

// =====================================
// EDIT POST
// =====================================

async function editPost(id) {
    const post = allPosts.find(item => item._id === id);

    if (!post) return;

    const title = prompt("Enter new title:", post.title || "");
    if (title === null) return;

    const author = prompt("Enter author:", post.author || "");
    if (author === null) return;

    const content = prompt("Enter new content:", post.content || "");
    if (content === null) return;

    if (!title.trim() || !author.trim() || !content.trim()) {
        alert("All fields are required.");
        return;
    }

    const updatedPost = {
        title: title.trim(),
        author: author.trim(),
        content: content.trim()
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        });

        if (!response.ok) {
            throw new Error("Could not update post");
        }

        alert("Blog updated successfully!");
        await getPosts();

    } catch (error) {
        console.error("Error updating post:", error);
        alert("Could not update the blog.");
    }
}

// =====================================
// READ FULL BLOG
// =====================================

function readPost(id) {
    const post = allPosts.find(item => item._id === id);

    if (!post) return;

    const blogReader = document.getElementById("blogReader");
    const blogsSection = document.getElementById("blogs");

    if (!blogReader || !blogsSection) return;

    blogReader.innerHTML = "";

    const backButton = document.createElement("button");
    backButton.className = "back-button";
    backButton.textContent = "← Back to Blogs";
    backButton.addEventListener("click", closeBlogReader);

    const article = document.createElement("article");
    article.className = "full-blog";

    const title = document.createElement("h1");
    title.textContent = post.title || "Untitled";

    const author = document.createElement("p");
    author.className = "full-blog-author";
    author.textContent = `By ${post.author || "Unknown"}`;

    const content = document.createElement("div");
    content.className = "full-blog-content";
    content.textContent = post.content || "";

    article.append(title, author, content);
    blogReader.append(backButton, article);

    blogsSection.style.display = "none";
    blogReader.style.display = "block";

    blogReader.scrollIntoView({ behavior: "smooth" });
}

// =====================================
// CLOSE BLOG READER
// =====================================

function closeBlogReader() {
    const blogReader = document.getElementById("blogReader");
    const blogsSection = document.getElementById("blogs");

    if (blogReader) {
        blogReader.style.display = "none";
    }

    if (blogsSection) {
        blogsSection.style.display = "block";
        blogsSection.scrollIntoView({ behavior: "smooth" });
    }
}

// =====================================
// LOAD POSTS WHEN PAGE OPENS
// =====================================

getPosts();
