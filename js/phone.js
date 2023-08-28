const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  // 1--- get the address
  const phoneContainer = document.getElementById("phone-container");
  // clear phoneContainer before new adding cards
  phoneContainer.textContent = "";

  // // display show all button if there are more than 12 phones
  const showALlContainer = document.getElementById("show-all-container");
  if (phones.length > 12) {
    showALlContainer.classList.remove("hidden");
  } else {
    showALlContainer.classList.add("hidden");
  }

  // display only first 12 phones
  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // 2-- creat a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    // 3-- set innerHTml
    phoneCard.innerHTML = `
    <figure class="img-bg"><img src=" ${phone.image} " /></figure>
    <div class="card-body">
      <h2 class="card-title"> ${phone.phone_name} </h2>
      <p class="card-detail">There are many variations of passages of available, but the majority have suffered</p>
      <p class="price"> $999 </p>
      <div class="card-actions justify-end">
        <button class="btn">Show Details</button>
      </div>
    </div>
        `;
    // 4-- appendChild
    phoneContainer.appendChild(phoneCard);
  });
  // hide loading sppiner
  loadingSpinner(false);
};

// handle search
const handleSearch = () => {
  loadingSpinner(true) //spiner function called
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhone(searchText);
};

// loading snipper
const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById('spinner');
  if(isLoading){
    spinner.classList.remove('hidden')
  }
  else{
    spinner.classList.add('hidden')
  }
}