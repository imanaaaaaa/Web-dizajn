const BASE_URL = "https://ptf-web-dizajn-2022.azurewebsites.net/";

let Services = [];

fetch (`${BASE_URL}/api/Services`)
    .then (res => {
        return res.json();
    })
    .then (data => {
        Services = data;
        renderServices(data);
    });

const renderServices = (Services) => {
    const servicesRow = document.getElementById('services-row');

    let resultServicesHtml = '';

    Services.forEach(Service => {
        resultServicesHtml += `
        <div class="card">
            <img src="${Service.photoUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${Service.name}</h5>
                <p class="card-text">${Service.price} KM</p>
                <button type="button" onclick="fillEditData(${Service.id})" class="btn btn-primary">Edit</a>
            </div>
        </div>`;
    });

    servicesRow.innerHTML = resultServicesHtml;

}    


const fillEditData = (ServiceId) => {
    const Service = Services.find(Service => Service.id === ServiceId);
    const ServiceFormId = document.getElementById('Service-id');
    const ServiceFormName = document.getElementById('Service-name');
    const ServiceFormPrice = document.getElementById('Service-price');
    const ServiceFormImage = document.getElementById('Service-image');

    ServiceFormId.value = Service.id;
    ServiceFormName.value = Service.name;
    ServiceFormPrice.value = Service.price;
    ServiceFormImage.value = Service.photoUrl;
}

const editServices = () => { 
    const ServiceFormId = document.getElementById('Service-id').value;
    const ServiceFormName = document.getElementById('Service-name').value;
    const ServiceFormPrice = document.getElementById('Service-price').value;
    const ServiceFormImage = document.getElementById('Service-image').value;

    fetch(`${BASE_URL}/api/Services`, {
        method: 'PUT', 
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: ServiceFormId,
            name: ServiceFormName,
            photoUrl: ServiceFormImage,
            price: ServiceFormPrice
        })
    })
    .then(res => {
        if(!res.ok)
        {
            alert('Error');
        }
    })
}
/*
const addServices = () => {
    //const todoName = document.getElementById('todo-name').value;
    const ServicesId = document.getElementById('Services-id').value;
    const ServicesName = document.getElementById('Services-name').value;
    const ServicesImage = document.getElementById('Services-image').value;
    const ServicesPrice = document.getElementById('Services-price').value;

    fetch(`${BASE_URL}/api/Services`, {
        method: 'POST',
        headers: new Headers({'content-type': 'application/json'}),
        body: JSON.stringify({
            id: Services-id,
            name: Services-name,
            photoUrl: Services-image,
            price: Services-price
        })
    })
    .then(res => {
        console.log(res);
    })
}

const deleteServices = (id) => {
    fetch(`${BASE_URL}/api/Services/${id}`, {
        method: 'DELETE'
    })
    .then(res => {
        console.log(res);
    })
}    */