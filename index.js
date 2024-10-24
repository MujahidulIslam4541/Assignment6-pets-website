// All API Button loading

const loadButton = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`);
  const data = await response.json();
  loadButtonDisplay(data.categories)
}


const loadButtonDisplay = (categories) => {
  const categoriesContainer = document.getElementById('categories');

  categories.forEach(data => {
    // console.log(data);

    // create button
    const button = document.createElement("button");
    button.classList = ""
    button.innerHTML = `
        <button id="btn-${data.category}" onclick="showSpecificElement('${data.category}')" class="flex justify-center items-center gap-2 btn w-32 border   category-btn">
        <img class="w-6" src="${data.category_icon}"/>
        <p> ${data.category}</p>
        </button>
        `
    categoriesContainer.appendChild(button);
  });
}




// clicked button show the specific elements
const showSpecificElement = async (category) => {

  // fetch clicked button
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then(res => res.json())
    .then(data => {
      // all active class removed
      removeActiveClass()

      // all active class added
      const activeBtn = document.getElementById(`btn-${category}`)
      activeBtn.classList.add("active")
      loadCardDisplay(data.data)
    })
}


// removeActiveClass function call
const removeActiveClass = () => {
  const button = document.getElementsByClassName('category-btn');
  // console.log(button);
  for (let btn of button) {
    btn.classList.remove('active')
  }
}


// short by price onclick handler add
const sortByPrice = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const cardCall = await response.json();
  cardCall.pets.sort((a, b) => b.price - a.price);
  loadCardDisplay(cardCall.pets);
}



// loadCardCall
const loadCardCall = async () => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  const cardCall = await response.json();
  loadCardDisplay(cardCall.pets);
}





// loadCardDisplay
const loadCardDisplay = async (data) => {
  const cardContainer = document.getElementById('card');
  cardContainer.innerHTML = "";

  // Bird Button style
  if (data.length == 0) {
    cardContainer.classList.remove("grid");
    cardContainer.innerHTML = `
    <div class="hero bg-[#13131308] rounded-md">
  <div class="hero-content text-center">
    <div class="">
    <div class="flex justify-center items-center"><img src="./images/error.webp" alt=""></div>
      <h1 class="text-3xl md:text-5xl font-bold">No Information Available</h1>
      <p class="py-6">
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
        its layout. The point of using Lorem Ipsum is that it has a.
      </p>
    </div>
  </div>
</div>
        `;
    return;
  }
  else {
    cardContainer.classList.add("grid");
  }

  // ForEach method added
  data.forEach(item => {

    const card = document.createElement('div');
    card.classList = "card shadow-xl"
    card.innerHTML = `
    <figure class="p-2">
    <img
      src="${item.image}"
      alt="Shoes"
      class="rounded-md" />
  </figure>
  <div class="p-2 flex flex-col gap-2">
    <h2 class="card-title text-xl font-bold">${item.pet_name?item.pet_name:' Not Available'}</h2>
    <p class="text-[#131313B3] font-semibold"> <i class="fa-solid fa-grip "></i> Bread: ${item.breed?item.breed:'Not Available'}</p>
    <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-briefcase"></i> Date Of Birth: ${item.date_of_birth?item.date_of_birth:'Not Available'}</p>
    <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-venus"></i> Gender: ${item.gender?item.gender:'Not Available'}</p>
    <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-dollar-sign"></i> Price: ${item.price?item.price:'Not Available'}$</p>
    <div class="card-actions">

      <p onclick="shortBy('${item.image}')" class="btn border bg-transparent"><i class="fa-regular fa-thumbs-up"></i></p>
      
      <button onclick="closeButton()" class="btn  border text-[#0E7A81] bg-transparent hover:bg-[#0E7A81] hover:text-white">Adopt</button>


      <p onclick="loadDetails('${item.petId}')" class="btn border text-[#0E7A81] bg-transparent hover:bg-[#0E7A81] hover:text-white">Details</p>
    </div>
  </div>
    
    `;
    cardContainer.appendChild(card)
  })
}


// short by image added
const shortBy = (image) => {
  const shortContainer = document.getElementById('shortBy');
  const div = document.createElement('div');
  div.innerHTML = `
    <img class="rounded-md w-full" src="${image}" alt="">
    
  `
  shortContainer.appendChild(div)
}



// card details button
const loadDetails = async (petId) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
  const data = await response.json();
  displayDetails(data.petData)

}


// display details card
const displayDetails = (card) => {
  const modalContainer = document.getElementById('modal-content');
  modalContainer.innerHTML = `
  <img class="w-full rounded-md" src="${card.image}"/>
  <h2 class="card-title text-xl font-bold">${card.pet_name}</h2>

  <div class="flex gap-6 border-b my-3 py-2">
    <div>
      
      <p class="text-[#131313B3] font-semibold"> <i class="fa-solid fa-grip "></i> Bread: ${card.breed?card.breed:'Not Available'}</p>
      <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-briefcase"></i> Date Of Birth: ${card.date_of_birth?card.date_of_birth:'Not Available'}</p>
       <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-venus"></i> vaccinated_status: ${card.vaccinated_status?card.vaccinated_status:'Not Available'}</p>
    
    </div>
    <div>
     
      <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-venus"></i> Gender: ${card.gender?card.gender:'Not Available'}</p>
      <p class="text-[#131313B3] font-semibold"><i class="fa-solid fa-dollar-sign"></i> Price: ${card.price?card.price:'Not Available'}$</p>
    </div>
  
  </div>

    <p class="text-[#131313B3]"><span class=" text-black text-xl font-bold"> Details Information</span>: <br> ${card.pet_details}</p>
  `

  // showModal
  document.getElementById('modalCustom').showModal()
};


// Adopt button closed
const closeButton = () => {
  my_modal_5.showModal()
  const modal = document.getElementById('my_modal_5');
  let count = 3;
  modal.showModal();

  let setTime = setInterval(() => {
    count--;
    document.getElementById('countDown').innerText = count;
    if (count == 0) {
      document.getElementById('countDown').innerText = 3;
      modal.close();
      clearInterval(setTime)
    }
  }, 1000);

}



loadButton()
loadCardCall()