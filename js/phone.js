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
    phoneCard.classList = `card shadow-xl`;
    // 3-- set innerHTml
    phoneCard.innerHTML = `
    <figure class="img-bg"><img src=" ${phone.image} " /></figure>
    <div class="card-body">
      <h2 class="card-title"> ${phone.phone_name} </h2>
      <p class="card-detail">There are many variations of passages of available, but the majority have suffered</p>
      <p class="price"> $999 </p>
      <div class="card-actions justify-end">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn">Show Details</button>
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
  loadingSpinner(true); //spiner function called
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhone(searchText);
};

// loading snipper
const loadingSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

// handle show detail
const handleShowDetail = async (id) => {
  console.log("click", id);
  // show single phone detail
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
  const phone = data.data;
  showPhoneDetails(phone);
};

// show phone details
const showPhoneDetails = (phone) => {
  console.log(phone);
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
  <img src=" ${phone.image} " />
  <h1 class="font-bold text-lg"> ${phone.name} </h1>
  <p> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h4><span class="section details">Storage:</span> ${phone?.mainFeatures.storage} </h4>
  <h4><span class="section details">Display Size:</span> ${phone?.mainFeatures?.displaySize} </h4>
  <h4><span class="section details">Chipset:</span> ${phone?.mainFeatures?.chipSet} </h4>
  <h4><span class="section details">Memory:</span> ${phone?.mainFeatures?.memory} </h4>
  <h4><span class="section details">Slug:</span> ${phone?.slug} </h4>
  <h4><span class="section details">Realese Date:</span> ${phone?.releaseDate} </h4>
  <h4><span class="section details">Brand:</span> ${phone?.brand} </h4>
  <h4><span class="section details">Gps:</span> ${phone?.others?.GPS ||'NO Gps available'} </h4>
  `;
  // show the modal
  show_details_modal.showModal();
};
