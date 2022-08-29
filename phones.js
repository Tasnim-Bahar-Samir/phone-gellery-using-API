const loadData = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
    const data = await res.json();
    displayPhones(data.data);
}
loadData();


const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phones.forEach(phone =>{
        console.log(phone)
        const{phone_name,image} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = ` <div class="card">
        <img src="${image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>`
      phonesContainer.appendChild(phoneDiv);

    })
}