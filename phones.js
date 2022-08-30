const loadData = async (search_phone,limit)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search_phone}`)
    const data = await res.json();
    displayPhones(data.data, limit);
}
loadData('apple',10);


const displayPhones = (phones, limit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    const showAllBtn = document.getElementById('show-all');
    if(limit && phones.length > 10 ){
       phones = phones.slice(0, 10);
        showAllBtn.classList.remove('d-none');
    }else{
        showAllBtn.classList.add('d-none');
    }

    const errorMsg = document.getElementById('error');
    if(phones.length === 0){
        errorMsg.classList.remove('d-none');
    }else{
        errorMsg.classList.add('d-none');
    }
    phones.forEach(phone =>{
        
        const{phone_name,image,slug} = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = ` <div class="card">
        <img src="${image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick = "loadDetails('${slug}')" class ="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
        </div>
      </div>`
      phonesContainer.appendChild(phoneDiv);
    })
    spinner(false);
}

// data proccess function 
const dataProceess =limit=>{
    spinner(true)
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;
    loadData(inputValue,limit);
}


document.getElementById('search-btn').addEventListener('click',(e)=>{
    e.preventDefault();
    dataProceess(10);
})

function spinner(isLoading){
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }else{
        spinner.classList.add('d-none');
    }
}



// click event to show all button 
document.getElementById('show-all').addEventListener('click',()=>{
    console.log('clicked')
    dataProceess();
})



//load details

const loadDetails = async (id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);
}

//display details
const showDetails = (details) =>{
    console.log(details)
    const title = document.getElementById('phoneModalLabel');
    console.log(details.name)
    title.innerText = details.name;
    const body = document.getElementById('details');
    body.innerHTML = `
        <p>Release Date : ${details.releaseDate ? details.releaseDate : 'N/A'}</p>
        <p>Chipset : ${details.mainFeatures ? details.mainFeatures.chipSet: 'N/A'}</p>
        <p>Display Size : ${details.mainFeatures ? details.mainFeatures.displaySize : 'N/A'}</p>
        <p>Memory : ${details.mainFeatures ? details.mainFeatures.memory: 'N/A'}</p>

    `

}