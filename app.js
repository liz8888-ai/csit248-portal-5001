// Enrolment: A85204925001 | Started: 18 November 2026

const minPasswordLength = 7;
const maxNameLength = 25;

function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isValidPhone(phone) {
  const pattern = /^[0-9]{9}$/;
  return pattern.test(phone);
}

function getErrors() {
  const errors = [];

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const city = document.getElementById("city").value;

  if (name === "") {
    errors.push("Full name is required.");
  } else if (name.length > maxNameLength) {
    errors.push("Full name must be at most " + maxNameLength + " characters.");
  }

  if (email === "") {
    errors.push("Email is required.");
  } else if (isValidEmail(email) === false) {
    errors.push("Email is not valid.");
  }

  if (phone === "") {
    errors.push("Phone is required.");
  } else if (isValidPhone(phone) === false) {
    errors.push("Phone must contain exactly 9 digits.");
  }

  if (password === "") {
    errors.push("Password is required.");
  } else if (password.length < minPasswordLength) {
    errors.push("Password must be at least " + minPasswordLength + " characters.");
  }

  if (confirmPassword === "") {
    errors.push("Confirm password is required.");
  } else if (password !== confirmPassword) {
    errors.push("Passwords do not match.");
  }

  if (city === "") {
    errors.push("Please choose a city.");
  }

  return errors;
}

function showErrors(errors) {
  const errorList = document.getElementById("errorList");
  errorList.textContent = "";

  for (let i = 0; i < errors.length; i++) {
    const item = document.createElement("li");
    item.textContent = errors[i];
    errorList.appendChild(item);
  }
}

function isFieldInvalid(id) {
  const value = document.getElementById(id).value.trim();

  if (id === "fullName") {
    return value === "" || value.length > maxNameLength;
  }
  if (id === "email") {
    return isValidEmail(value) === false;
  }
  if (id === "phone") {
    return isValidPhone(value) === false;
  }
  if (id === "password") {
    return document.getElementById(id).value.length < minPasswordLength;
  }
  if (id === "confirmPassword") {
    return value === "" || value !== document.getElementById("password").value;
  }
  if (id === "city") {
    return value === "";
  }
  return false;
}

function addBlurCheck(id) {
  const field = document.getElementById(id);

  field.addEventListener("blur", function () {
    if (isFieldInvalid(id) === true) {
      field.classList.add("invalid");
    } else {
      field.classList.remove("invalid");
    }
  });
}

function updateNameCounter() {
  const nameField = document.getElementById("fullName");
  const counter = document.getElementById("nameCounter");
  const left = maxNameLength - nameField.value.length;

  if (left >= 0) {
    counter.textContent = left + " characters left out of " + maxNameLength;
  } else {
    counter.textContent = "Too long by " + (0 - left) + " characters";
  }
}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const errors = getErrors();
    showErrors(errors);

    if (errors.length === 0) {
      const ok = confirm("Register ?");
      if (ok === true) {
        const name = document.getElementById("fullName").value.trim();
        window.location.href = "board.html?name=" + encodeURIComponent(name);
      }
    }
  });

  addBlurCheck("fullName");
  addBlurCheck("email");
  addBlurCheck("phone");
  addBlurCheck("password");
  addBlurCheck("confirmPassword");
  addBlurCheck("city");

  document.getElementById("fullName").addEventListener("keyup", updateNameCounter);

  document.getElementById("city").addEventListener("change", function () {
    const cityMessage = document.getElementById("cityMessage");
    const city = document.getElementById("city").value;

    if (city === "") {
      cityMessage.textContent = "";
    } else {
      cityMessage.textContent = "You chose " + city;
    }
  });

console.log("A85204925001");