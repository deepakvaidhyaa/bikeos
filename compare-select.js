const bikeCount = document.getElementById("bikeCount");
const listEl = document.getElementById("selectedList");
const compareBtn = document.getElementById("goCompare");
const searchInput = document.querySelector(".search-bike-input");
const resultsBox = document.getElementById("searchResults");

/* bikes[] comes from bikes.js */
let selected = [];

/* ===============================
   RENDER SELECTED BIKES
================================ */
function renderSelected() {
  listEl.innerHTML = "";

  if (selected.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No bikes selected yet";
    li.style.opacity = "0.6";
    listEl.appendChild(li);
    return;
  }

  selected.forEach((bike, index) => {
    const li = document.createElement("li");
    li.textContent = bike.name;

    // Optional remove on click
    li.style.cursor = "pointer";
    li.title = "Click to remove";
    li.onclick = () => {
      selected.splice(index, 1);
      renderSelected();
    };

    listEl.appendChild(li);
  });
}

/* ===============================
   SEARCH + AUTOCOMPLETE
================================ */
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  resultsBox.innerHTML = "";

  if (!query) {
    resultsBox.classList.remove("active");
    return;
  }

  const matches = bikes.filter(bike =>
    bike.name.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "search-result-item";
    empty.textContent = "No bikes found";
    empty.style.opacity = "0.6";
    resultsBox.appendChild(empty);
  } else {
    matches.forEach(bike => {
      const item = document.createElement("div");
      item.className = "search-result-item";
      item.textContent = bike.name;

      item.onclick = () => {
        const limit = parseInt(bikeCount.value);
        const exists = selected.some(b => b.name === bike.name);

        if (exists) {
          alert("Bike already selected");
          return;
        }

        if (selected.length >= limit) {
          alert(`You can select only ${limit} bikes`);
          return;
        }

        selected.push(bike);
        renderSelected();

        searchInput.value = "";
        resultsBox.innerHTML = "";
        resultsBox.classList.remove("active");
      };

      resultsBox.appendChild(item);
    });
  }

  resultsBox.classList.add("active");
});

/* ===============================
   BIKE COUNT CHANGE
================================ */
bikeCount.onchange = () => {
  selected = [];
  renderSelected();
};

/* ===============================
   COMPARE BUTTON
================================ */
compareBtn.onclick = () => {
  const limit = parseInt(bikeCount.value);

  if (selected.length !== limit) {
    alert(`Please select exactly ${limit} bikes`);
    return;
  }

  localStorage.setItem("compareBikes", JSON.stringify(selected));
  window.location.href = "compare.html";
};

/* INIT */
renderSelected();
