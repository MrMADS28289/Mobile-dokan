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
        <div id="phone" class="d-flex mx-auto mb-3 py-4 pe-2 rounded-3 shadow-lg" style="width: 18rem;">
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
    <div id="phone" class="card d-flex mx-auto my-4 p-4 rounded-3 shadow-lg" style="width: 18rem;">
            <img src="${detail.image}" class="card-img-top ms-2" alt="...">
            <div class="card-body p-3">
                <h5 class="card-title">${detail.brand}</h5>
                <p class="card-text">${detail.name}</p>
            </div>
        </div>
    `;
    parentDiv.appendChild(div)
    console.log(detail)
};