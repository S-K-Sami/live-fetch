const result =  document.querySelector("#result");
const filter = document.querySelector("#filter");
let listItems = [];

filter.addEventListener("input", e => filterUsers(e.target.value));

async function getUsers() {
    const res = await fetch("https://randomuser.me/api?results=50");
    const { results } = await res.json();

    result.innerHTML = "";

    let htmlBuilder = "";
    for (let i = 0; i < results.length; i++) {
        const user = results[i];
        // const li = document.createElement("li");
        // listItems.push(li);
        const imgLnk = user.picture.medium;
        const alt_str = imgLnk.split("/");
        // li.innerHTML = `
        htmlBuilder += `
            <li>
                <img src="${user.gender==="male"?imgLnk:"NA.jpg"}" alt="user_${alt_str.slice(alt_str.length-2)}">
                <div class="user-info">
                    <h4>${user.name.first + " " + user.name.last}</h4>
                    <p>${user.location.city}, ${user.location.country}</p>
                </div>
            </li>
        `;
        // htmlBuilder += `<li>${li.innerHTML}</li>`;
    }
    result.innerHTML = htmlBuilder;
    listItems = result.querySelectorAll("li");
}
getUsers();

function filterUsers(searchText) {
    for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        if (li.innerText.toLowerCase().includes(searchText.toLowerCase())) {
            li.classList.remove("hide");
        } else {li.classList.add("hide");}
    }
    // console.log(result.querySelectorAll("li"));
}