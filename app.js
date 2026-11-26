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

const registrationForm = document.getElementById("registrationForm");

if (registrationForm !== null) {
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const errors = getErrors();
    showErrors(errors);
  });
}

console.log("A85204925001");