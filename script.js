const featuredContainer = document.getElementById("featuredContainer");
const resultContainer = document.getElementById("resultContainer");
const tabs = document.querySelectorAll(".tab");

const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");

if (searchQuery) {
  searchBikes(searchQuery);
  scrollToResults();
}


function renderBikes(list, container) {
  container.innerHTML = "";

  list.forEach(bike => {
    container.innerHTML += `
      <div class="bike-card" onclick="openBike('${encodeURIComponent(bike.name)}')">
        <div class="bike-img-wrap">
          <img src="${bike.imageUrl}" alt="${bike.name}">
        </div>

        <div class="bike-info">
          <h3>${bike.name}</h3>

          <p class="bike-price">
            ₹ ${bike.price.toLocaleString()}
            <span>Onwards</span>
          </p>

          <p class="bike-sub">Avg. Ex-Showroom price</p>

          <button class="price-btn">Check on-road price</button>
        </div>
      </div>
    `;
  });
}

function openBike(name) {
  window.location.href = `bike.html?name=${name}`;
}




// Default load
const shuffledTrending = shuffleArray(
  bikes.filter(b => b.category === "trending")
);
renderBikes(shuffledTrending, featuredContainer);


// Tabs logic
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;
    const filtered = bikes.filter(b => b.category === type);
    renderBikes(filtered, featuredContainer);
  });
});

// Search logic
function searchBikes(query) {
  const q = query.toLowerCase();

  const min = parseInt(document.getElementById("minPrice").value) || 0;
  const max = parseInt(document.getElementById("maxPrice").value) || Infinity;

  const results = bikes.filter(b =>
    (b.name.toLowerCase().includes(q) ||
     b.brand.toLowerCase().includes(q) ||
     b.style.toLowerCase().includes(q)) &&
    b.price >= min &&
    b.price <= max
  );

  renderBikes(results, resultContainer);
}


document.getElementById("heroSearch").addEventListener("input", e => {
  searchBikes(e.target.value);
});

document.getElementById("navSearch").addEventListener("input", e => {
  searchBikes(e.target.value);
});

function scrollToResults() {
  document.querySelector(".results").scrollIntoView({
    behavior: "smooth"
  });
}
document.getElementById("navSubmit").addEventListener("click", () => {
  const query = document.getElementById("navSearch").value;
  searchBikes(query);
  scrollToResults();
});
document.getElementById("heroSubmit").addEventListener("click", () => {
  const query = document.getElementById("heroSearch").value;
  searchBikes(query);
  scrollToResults();
});
["heroSearch", "navSearch"].forEach(id => {
  document.getElementById(id).addEventListener("keypress", e => {
    if (e.key === "Enter") {
      searchBikes(e.target.value);
      scrollToResults();
    }
  });
});
let sliderIndex = 0;

function autoScrollFeatured() {
  const slider = document.getElementById("featuredContainer");
  const cards = slider.children.length;
  const visibleCards = 4;

  if (cards <= visibleCards) return;

  sliderIndex++;

  if (sliderIndex > cards - visibleCards) {
    sliderIndex = 0;
  }

  slider.style.transform = `translateX(-${sliderIndex * 25}%)`;
}

setInterval(autoScrollFeatured, 4000); // ⬅️ slower = smoother

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const type = tab.dataset.type;
    const filtered = bikes.filter(b => b.category === type);
    renderBikes(filtered, featuredContainer);

    sliderIndex = 0;
    featuredContainer.style.transform = "translateX(0)";
  });
});
let sliderTimer = setInterval(autoScrollFeatured, 4000);

const sliderWrapper = document.querySelector(".slider-wrapper");

sliderWrapper.addEventListener("mouseenter", () => {
  clearInterval(sliderTimer);
});

sliderWrapper.addEventListener("mouseleave", () => {
  sliderTimer = setInterval(autoScrollFeatured, 80000);
});


//suffle scroll
function shuffleArray(arr) {
  return arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    .classList.toggle("scrolled", window.scrollY > 10);
});
