"use strict";

// light-theme
const modeToggle = document.getElementById("mode-toggle");
const body = document.body;

modeToggle.addEventListener("click", function () {
  body.classList.toggle("light-mode");

  const modeIcon = document.getElementById("mode-icon");
  if (body.classList.contains("light-mode")) {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  } else {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  }
});
// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// quotes variables
const quotesItem = document.querySelectorAll("[data-quotes-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const quotesModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < quotesItem.length; i++) {
  quotesItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-quotes-avatar]").src;
    modalImg.alt = this.querySelector("[data-quotes-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-quotes-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-quotes-text]").innerHTML;

    quotesModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", quotesModalFunc);
overlay.addEventListener("click", quotesModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("active");
    } else {
      formBtn.setAttribute("active", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

// contact-form
const scriptURL =
  "https://script.google.com/macros/s/AKfycbycq1T9aFOLEtH_RddgQdDmhkH0nCg5cAr6O2ygiQE8DFUbfLnEtmP01O4cB9URd-4DTg/exec";
const forms = document.forms["contact-form"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      function showNotification(message, type) {
        var alertElement = document.getElementById("alert");
        alertElement.textContent = message;
        alertElement.classList.add(type);
        alertElement.style.display = "block";

        setTimeout(function () {
          alertElement.style.display = "none";
          alertElement.classList.remove(type);
        }, 3000);
      }
      showNotification("Your message has been successfully sent!", "success");
      form.reset();
      console.log("Success!", response);
    })
    .catch((error) => console.error("Error!", error.message));
});

// scroll-to-top
const scrollToTopBtn = document.getElementById("scroll-to-top");
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});
scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
