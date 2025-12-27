const bikes = JSON.parse(localStorage.getItem("compareBikes")) || [];
const root = document.getElementById("compareTable");

if (bikes.length < 2) {
  root.innerHTML = "<p>Select at least 2 bikes to compare.</p>";
  throw new Error("Not enough bikes");
}

/* ===== VALUES ===== */
const prices = bikes.map(b => b.price);
const engines = bikes.map(b => b.cc);
const mileage = bikes.map(b => parseInt(b.mileage));

const minPrice = Math.min(...prices);
const maxPrice = Math.max(...prices);
const maxCC = Math.max(...engines);
const minCC = Math.min(...engines);
const maxMileage = Math.max(...mileage);
const minMileage = Math.min(...mileage);

/* ===== TABLE ===== */
const table = document.createElement("div");
table.className = "compare-table";
table.style.gridTemplateColumns = `200px repeat(${bikes.length}, 1fr)`;

/* ===== HEADER ===== */
table.appendChild(document.createElement("div"));

bikes.forEach(b => {
  const cell = document.createElement("div");
  cell.className = "cell header";
  cell.innerHTML = `
    <img src="${b.image || b.imageUrl}" class="bike-img">
    <div>${b.name}</div>
  `;
  table.appendChild(cell);
});

/* ===== ROW BUILDER ===== */
function addRow(label, cells) {
  const labelCell = document.createElement("div");
  labelCell.className = "cell label";
  labelCell.textContent = label;
  table.appendChild(labelCell);

  cells.forEach(c => table.appendChild(c));
}

/* ===== PRICE ===== */
addRow("Price", bikes.map(b => {
  const c = document.createElement("div");
  c.className = "cell";
  c.innerHTML = `₹ ${b.price.toLocaleString()}`;

  if (b.price === minPrice) {
    c.classList.add("best");
    c.innerHTML += `<span class="badge">BEST</span>`;
  } else if (b.price === maxPrice) {
    c.classList.add("loser");
    c.innerHTML += `<span class="badge">LOSER</span>`;
  } else {
    c.classList.add("neutral");
  }

  return c;
}));

/* ===== ENGINE ===== */
addRow("Engine", bikes.map(b => {
  const c = document.createElement("div");
  c.className = "cell";
  c.innerHTML = `${b.cc} cc`;

  if (b.cc === maxCC) {
    c.classList.add("best");
    c.innerHTML += `<span class="badge">BEST</span>`;
  } else if (b.cc === minCC) {
    c.classList.add("loser");
    c.innerHTML += `<span class="badge">LOSER</span>`;
  } else {
    c.classList.add("neutral");
  }

  return c;
}));


/* ===== MILEAGE ===== */
addRow("Mileage", bikes.map(b => {
  const m = parseInt(b.mileage);
  const c = document.createElement("div");
  c.className = "cell";
  c.innerHTML = b.mileage;

  if (m === maxMileage) {
    c.classList.add("best");
    c.innerHTML += `<span class="badge">BEST</span>`;
  } else if (m === minMileage) {
    c.classList.add("loser");
    c.innerHTML += `<span class="badge">LOSER</span>`;
  } else {
    c.classList.add("neutral");
  }

  return c;
}));



/* ===== STYLE ===== */
addRow("Style", bikes.map(b => {
  const c = document.createElement("div");
  c.className = "cell";
  c.textContent = b.style;
  return c;
}));

root.appendChild(table);
