let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("https://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toys => {
      let toysHTML = toys.map((toy) => {
        return `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar" />
          <p>${toy.likes} Likes </p>
          <button data-id="${toy.id}"class="like-btn">Like <3</button>
        </div>
        `
      })

      toyCollection.innerHTML = toysHTML.join('')

    })
    toyFormContainer.addEventListener("submit", function(e) {
      method: "Post",
      header: {
        "Content-Type": "application/json"
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 100
      })
    })
      .then(resp => resp.json())
      .then(newToy => {
        let newToyHTML = `
        <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
        </div> 
        `

        toyCollection.innerHTML += newToyHTML
        e.target.reset()
      })
  })

  toyCollection.addEventListener("click", function(e){
    if (e.target.className === "like-btn"){
      let currentLikes = parseInt(e.target.previousElementSibling.innerText)
      e.target.previousElementSibling.innerText = currentLikes + 1 + " Likes"

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": currentLikes + 1
        })
      })

    }
  })
});
