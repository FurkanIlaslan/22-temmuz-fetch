let url = "https://api.unsplash.com/search/photos?page=1";
let apiKey = "WCalV_wyQBbkYzIQZRleDb0XZRL215rcD4TklHWxO_M";

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");

// ! Arama butonuna bastığımızda kodların çalışması için;
searchBtn.addEventListener("click", function(){
    let searchText = searchInput.value;
    const query = `${url}&query=${searchText}&client_id=${apiKey}`
    sendRequest(query)
    searchInput.value = "";
})

// ! Enter Tuşuna Basıldığında kodların çalışması için;
searchInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        let searchText = searchInput.value;
        const query = `${url}&query=${searchText}&client_id=${apiKey}`
        sendRequest(query)
        searchInput.value = "";
    }
})

function sendRequest(url){
    fetch(url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        // console.log(data)
        const image = data.results;
        // console.log(image)
        image.forEach(function(resim){
            console.log(resim)
            ekranaYazdir(resim)
        })
    })
}

// ! API'den gelen verileri ekrana yazdırmak için;
const content = document.querySelector(".content");

function ekranaYazdir(image){
    const body = document.querySelector("body");

    const div = document.createElement("div");
    div.style.border = "2px solid green";
    div.style.width = "280px";
    div.style.height = "280px";
    div.id = image.id;

    const img = document.createElement("img");
    img.style.width = "100%";
    img.style.height = "100%";
    img.src = image.urls.small;

    const deleteBtn = document.createElement("button");
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerHTML = "SİL";

    body.appendChild(content);
    content.appendChild(div);
    div.appendChild(img);
    div.appendChild(deleteBtn);
}

// ! Temizle Butonuna Bastığım Zaman Tüm İçeriği Temizlesin
const clearBtn = document.querySelector("#clearBtn");

clearBtn.addEventListener("click", function(){
    content.innerHTML = "";
})


// ! Sil butonuna tıklanan elemanı silmek için;
content.addEventListener("click", function(e){
    if(e.target.id.includes("deleteBtn")){
        const parentDiv = e.target.parentElement;
        console.log(parentDiv)
        parentDiv.style.display = "none";
    }
})