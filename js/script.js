const searceInput = document.getElementById('searce-input');
// console.log(searceInput.value)

const searceBtn = () => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searceInput.value}`);
    fetch(url)
        .then(res => res.json())
        .then(data => loadPhones(data.data))
    searceInput.value = '';
    // console.log('hosse!', url)
};
const loadPhones = phones => {
    const parentDiv = document.getElementById('parent');
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="d-flex mx-auto mb-3 py-4 pe-2 rounded-3 shadow-lg phone" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top ms-2" alt="...">
                <div class="card-body p-3">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}</p>
                    <button onclick="loadDetail('${phone.slug}')" class="btn btn-dark">Details</button>
                </div>
            </div>
        `;
        parentDiv.appendChild(div);
        // console.log(phone.slug)
    });
};
const parentDiv = document.getElementById('detail-container');
const loadDetail = (details) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
    // console.log(detail)
    parentDiv.innerHTML = '';
};
const displayDetail = detail => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="d-flex flex-column w-100 mx-auto m-2 p-3 rounded-3 shadow-lg phone" style="width: 18rem;">
            <img src="${detail.image}" class="w-25" alt="...">
            <div class="card-body p-3">
                <h5 class="card-title">Brand: ${detail.brand} , Name: ${detail.name}</h5>
                <p class="card-text"></p>
                <p class="card-text">Display Size: ${detail.mainFeatures.displaySize}</p>
                <p class="card-text">Memory: ${detail.mainFeatures.memory}</p>
                <p class="card-text">Release Date: ${detail.releaseDate}</p>
                <p class="card-text">Sensores: ${detail.mainFeatures.sensors}</p>
            </div>
        </div>
    `;
    parentDiv.appendChild(div)
    console.log(detail)
};