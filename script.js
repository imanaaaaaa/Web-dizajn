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
                <h5 class="card-title" style="text-align:center">${Service.name}</h5>
                <p class="card-text">${Service.price} KM</p>
                <div class="buttoni">
                    <button type="button" class="btn btn-primary" style="margin:5px 5px 5px 0px; background-color:black" onclick="completeServices(${Service.id})">Complete</button>
                    <button type="button" class="btn btn-primary" style="margin:5px 5px 5px 0px; background-color:black" onclick="fillEditData(${Service.id})" data-bs-toggle="modal" data-bs-target="#edit-Services" data-bs-whatever="@getbootstrap">Edit</button>
                    <button type="button" class="btn btn-danger" style="margin:5px 5px 5px 0px" onclick="deleteServices(${Service.id})">Delete</button>
                    <span class="badge bg-${Service.isCompleted ? 'success' : 'danger'}">${Service.isCompleted ? 'Completed' : 'Active'}</span>
                </div>
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
            price: ServiceFormPrice,
            photoUrl: ServiceFormImage
        })
    })
    .then(res => {
        if(!res.ok)
        {
            console.log(`Status code: ${res.status}`);

            let kartica = document.getElementById(ServiceFormId);
            kartica.children[0].src = ServiceFormImage;
            kartica.children[1].children[0].innerHTML = ServiceFormName;
            kartica.children[1].children[1].innerHTML = ServiceFormPrice;
        }
    })
}

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
}   