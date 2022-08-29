const loadData = async (search_phone)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search_phone}`)
    const data = await res.json();
    displayPhones(data.data);
}
// loadData();


const displayPhones = phones =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    const errorMsg = document.getElementById('error');
    if(phones.length === 0){
        errorMsg.classList.remove('d-none');
    }else{
        errorMsg.classList.add('d-none');
    }
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
    spinner(false)
}

document.getElementById('search-btn').addEventListener('click',()=>{
    
    spinner(true)
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    loadData(inputValue);
    inputField.value = '';
})

function spinner(isLoading){
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }else{
        spinner.classList.add('d-none')
    }
}