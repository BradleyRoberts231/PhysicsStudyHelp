// script.js – site-wide JavaScript for Physics Formula Hub

// This file can be used for shared utilities, UI toggles, or global event handling.

document.addEventListener("DOMContentLoaded", () => {
  console.log("Physics Formula Hub loaded.");

  // Example: Highlight the active sidebar tab
  const currentPage = location.pathname.split("/").pop();
  const links = document.querySelectorAll(".sidebar a");

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.style.color = "#4dd0e1";
    }
  });
});
