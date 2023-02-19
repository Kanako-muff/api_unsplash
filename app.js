const apiKey = "6MEHfoXaFzCyYoE4t5uX04OcEuMjqP1YQpnLVZfBpOA";
const apiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}&query=`;

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    // fetchImages();  //　⬅︎ just "fetch" images, doesn't "display" them.
    displayImages(searchInput.value);
})

const fetchImages = async (query) => {
    const response = await axios.get(`${apiUrl}${query}`);
    console.log(response);
    const images = response.data.results;
    return images;
}

const displayImages = async (query) => {
    const images = await fetchImages(query);
    const imageContainer = document.querySelector(".image-container");

    imageContainer.innerHTML = "";

    images.forEach((image) => {
        const div = document.createElement("div");
        div.classList.add("image");
        div.style.backgroundImage = `url(${image.urls.small})`
        div.addEventListener("click", () => {
            showModal(image.urls.full)
        })
        imageContainer.appendChild(div)
    })
}

const showModal = (imageURL) => {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = 
    `
        <div class="modal-content">
            <div class="modal-bg">
                <img src="${imageURL}" id="full-size" alt="full size image" />
                <button id="close-button">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", () => {
        document.body.removeChild(modal);
    })

    const closeButton = document.getElementById("close-button");
    closeButton.addEventListener("click", () => {
        document.body.removeChild(modal);
    })
}