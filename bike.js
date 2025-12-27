// ===============================
// GET BIKE NAME FROM URL
// ===============================
const params = new URLSearchParams(window.location.search);
const bikeName = decodeURIComponent(params.get("name") || "");

// ===============================
// FIND BIKE
// ===============================
const bike = bikes.find(b => b.name === bikeName);

if (!bike) {
  alert("Bike not found");
  throw new Error("Bike not found");
}

// ===============================
// BASIC INFO
// ===============================
document.getElementById("bikeName").textContent = bike.name;
document.getElementById("crumbName").textContent = bike.name;

document.getElementById("bikePrice").textContent =
  `₹ ${bike.price.toLocaleString()} onwards`;

// ===============================
// BASIC CHIPS (cc + style only)
// ===============================
document.getElementById("basicChips").innerHTML = `
  <span>${bike.cc} cc</span>
  <span>${bike.style}</span>
`;

// ===============================
// FULL SPECIFICATIONS (ROW STYLE)
// ===============================
const specBox = document.getElementById("specChips");

if (typeof bikeSpecs !== "undefined" && bikeSpecs[bike.name]) {
  const s = bikeSpecs[bike.name];

  specBox.innerHTML = `
    <div class="spec-row"><span>Engine</span><span>${s.engine}</span></div>
    <div class="spec-row"><span>Power</span><span>${s.power}</span></div>
    <div class="spec-row"><span>Torque</span><span>${s.torque}</span></div>
    <div class="spec-row"><span>Gearbox</span><span>${s.gearbox}</span></div>
    <div class="spec-row"><span>Fuel Tank</span><span>${s.fuelTank}</span></div>
    <div class="spec-row"><span>Kerb Weight</span><span>${s.weight}</span></div>
    <div class="spec-row"><span>Brakes</span><span>${s.brakes}</span></div>
    <div class="spec-row"><span>Suspension</span><span>${s.suspension}</span></div>
  `;
} else {
  specBox.innerHTML = `<p class="muted">Specifications not available.</p>`;
}


// ===============================
// IMAGE GALLERY
// ===============================
const imgEl = document.getElementById("bikeImg");
const prevBtn = document.getElementById("prevImg");
const nextBtn = document.getElementById("nextImg");

const images = bike.images?.length ? bike.images : [bike.imageUrl];
let currentIndex = 0;

function showImage(index) {
  imgEl.style.opacity = "0";
  setTimeout(() => {
    imgEl.src = images[index];
    imgEl.style.opacity = "1";
  }, 120);
}

showImage(currentIndex);

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

// ===============================
// RIGHT SIDE BUY CARD STATS
// ===============================
const priceCard = document.querySelector(".bike-buy-card");

priceCard.insertAdjacentHTML(
  "afterbegin",
  `
  <div class="buy-stats">
    <span><strong>⭐ 3.9</strong> Rating</span>
    <span><strong>${bike.cc} cc</strong> Engine</span>
    <span><strong>${bike.mileage}</strong> Mileage</span>
  </div>
  `
);

// ===============================
// ON-ROAD PRICE MODAL
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("priceModal");
  const closeModalBtn = document.getElementById("closeModal");
  const citySelect = document.getElementById("citySelect");
  const breakupBox = document.getElementById("priceBreakup");
  const checkBtn = document.getElementById("checkOnRoad");

  if (!modal || !checkBtn) return;

  checkBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
    breakupBox.innerHTML = "";
    citySelect.value = "default";
  });

  citySelect.addEventListener("change", () => {
    if (citySelect.value === "default") return;

    const exShowroom = bike.price;
    const rto = Math.round(exShowroom * 0.10);
    const insurance = Math.round(exShowroom * 0.03);
    const onRoad = exShowroom + rto + insurance;

    breakupBox.innerHTML = `
      <div><span>Ex-Showroom</span><span>₹ ${exShowroom.toLocaleString()}</span></div>
      <div><span>RTO</span><span>₹ ${rto.toLocaleString()}</span></div>
      <div><span>Insurance</span><span>₹ ${insurance.toLocaleString()}</span></div>
      <div class="total">
        <span>On-Road Price</span>
        <span>₹ ${onRoad.toLocaleString()}</span>
      </div>
    `;
  });
});

// ===============================
// COMPARE BIKE LOGIC
// ===============================
const compareBtn = document.getElementById("compareBtn");

compareBtn.addEventListener("click", () => {
  let compareList = JSON.parse(localStorage.getItem("compareBikes")) || [];

  const index = compareList.findIndex(b => b.name === bike.name);

  if (index !== -1) {
    compareList.splice(index, 1);
    alert("Bike removed from comparison");
  } else {
    compareList.push({
      name: bike.name,
      brand: bike.brand,
      price: bike.price,
      mileage: bike.mileage,
      cc: bike.cc,
      style: bike.style,
      image: bike.images?.[0] || bike.imageUrl
    });
    alert("Bike added for comparison");
  }

  localStorage.setItem("compareBikes", JSON.stringify(compareList));
  window.location.href = "compare-select.html";
});
