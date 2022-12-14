const searceInput = document.getElementById('searce-input');
const parentDiv = document.getElementById('parent');
const detailParentDiv = document.getElementById('detail-container');
// Erorr part //
const showMoreBtn = style => {
    document.getElementById('more-btn').style.display = style;
}
showMoreBtn('none');
const loading = style => {
    document.getElementById('loading').style.display = style;
}
loading('none');
const notFoundErorr = style => {
    document.getElementById('not-found-erorr').style.display = style;
};
notFoundErorr('none');
// Searce Part //
const searceBtn = () => {
    const url = (`https://openapi.programming-hero.com/api/phones?search=${searceInput.value}`);
    fetch(url)
        .then(res => res.json())
        .then(data => loadPhones(data.data))
    searceInput.value = '';
    parentDiv.innerHTML = '';
    notFoundErorr('none');
    loading('block');
    detailParentDiv.innerHTML = '';
    // console.log('hosse!', url)
};
const loadPhones = phones => {
    const phoneSlice = phones.slice(0, 20);
    if (phones.length <= 0) {
        notFoundErorr('block');
        showMoreBtn('none');
    }
    else {
        notFoundErorr('none');
    }
    phoneSlice.forEach(phone => {
        const div = document.createElement('div');
        div.className = 'col col-12 col-md-4';
        div.innerHTML = `
    <div class="mb-3 p-3 rounded-3 shadow-lg phone" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top w-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button onclick="loadDetail('${phone.slug}')" class="btn btn-dark">Details</button>
            </div>
        </div>
    `;
        parentDiv.appendChild(div);
    });
    if (phones.length > 20) {
        showMoreBtn('block');
        document.getElementById('more-btn').addEventListener('click', function () {
            detailParentDiv.innerHTML = '';
            phones.forEach(phone => {
                const div = document.createElement('div');
                div.className = 'col col-12 col-md-4';
                div.innerHTML = `
        <div class="mb-3 p-3 rounded-3 shadow-lg phone" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top w-75" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <button onclick="loadDetail('${phone.slug}')" class="btn btn-dark">Details</button>
            </div>
         </div>
    `;
                parentDiv.appendChild(div);
                showMoreBtn('none');
            });
        })
    }
    loading('none');
};
// Deatils Part //
const loadDetail = (details) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
        .then(res => res.json())
        .then(data => displayDetail(data.data))
    detailParentDiv.innerHTML = '';
};
const displayDetail = detail => {
    let releaseErorr = '';
    detailParentDiv.innerHTML = '';
    if (detail.releaseDate == '') {
        releaseErorr = 'Realease date not found!';
    }
    else {
        releaseErorr = '';
    }
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="d-flex flex-column w-75 mx-auto p-5 rounded-3 shadow-lg phone" style="width: 18rem;">
            <img src="${detail.image}" class="w-25" alt="...">
            <div class="card-body p-3">
                <h5 class="card-title">Brand: ${detail.brand} , Name: ${detail.name}</h5>
                <p class="card-text"></p>
                <p class="card-text">Display Size: ${detail.mainFeatures.displaySize}</p>
                <p class="card-text">Memory: ${detail.mainFeatures.memory}</p>
                <p class="card-text release">Release: ${detail.releaseDate} ${releaseErorr}</p>
                <p class="card-text">Sensores: ${detail.mainFeatures.sensors}</p>
                <p class="card-text">Bluetooth: ${detail.others.Bluetooth}</p>
                <p class="card-text">GPS: ${detail.others.GPS}</p>
                <p class="card-text">NFC: ${detail.others.NFC}, Radio ${detail.others.Radio}</p>
                <p class="card-text">USB: ${detail.others.USB}</p>
                <p class="card-text">WLAN: ${detail.others.WLAN}</p>
            </div>
        </div>
    `;
    detailParentDiv.appendChild(div)
    // console.log(detail)
};