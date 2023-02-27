const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 10 phone only 
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
        // console.log(showAll);
    } else {
        showAll.classList.add('d-none')
    }


    // display no phone founds 
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }
    // display all phones 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
        <img  src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick ="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal" >Show Details</button>
        
        </div>
      </div>
        `;
        phoneContainer.appendChild(phoneDiv)
    });
    // stop loader 
    toggleSpinner(false)

}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhones(searchText, dataLimit)
}

// handle search button click 
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader 
    processSearch(10);
});

document.getElementById('search-filed').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10);
    }
});

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitles = document.getElementById('phoneDetailModalLabel');
    modalTitles.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date ${phone.releaseDate ? phone.releaseDate : 'No Release Date found'}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'no bluetooth'}</p>
    <p>Memory: ${phone.mainFeatures  ? phone.mainFeatures.memory : 'no memory'}</p>
    <img class="w-100" src="${phone.image}">
    `
}

// loadPhones();