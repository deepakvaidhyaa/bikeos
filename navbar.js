function initNavbarSearch() {
  const navSearch = document.getElementById("navSearch");
  const navSubmit = document.getElementById("navSubmit");

  if (!navSearch || !navSubmit || typeof bikes === "undefined") return;

  function doSearch() {
    const query = navSearch.value.toLowerCase().trim();
    if (!query) return;

    // Always redirect to index page for results
    window.location.href = `index.html?search=${encodeURIComponent(query)}`;
  }

  navSubmit.addEventListener("click", doSearch);

  navSearch.addEventListener("keypress", e => {
    if (e.key === "Enter") doSearch();
  });
}

document.addEventListener("DOMContentLoaded", initNavbarSearch);
