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

let allStudents = [];

function grade(marks) {
  if (marks < 41) {
    return "Fail";
  }
  if (marks < 75) {
    return "Pass";
  }
  return "Distinction";
}

function showStudents(list) {
  const tbody = document.getElementById("studentRows");
  tbody.textContent = "";

  for (let i = 0; i < list.length; i++) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = list[i].name;
    row.appendChild(nameCell);

    const marksCell = document.createElement("td");
    marksCell.textContent = list[i].marks;
    row.appendChild(marksCell);

    const cityCell = document.createElement("td");
    cityCell.textContent = list[i].city;
    row.appendChild(cityCell);

    const gradeCell = document.createElement("td");
    gradeCell.textContent = grade(list[i].marks);
    row.appendChild(gradeCell);

    tbody.appendChild(row);
  }
}

function sortAndShow() {
  const sortSelect = document.getElementById("sortSelect");
  const copy = allStudents.slice();

  if (sortSelect.value === "name") {
    copy.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else {
    copy.sort(function (a, b) {
      return b.marks - a.marks;
    });
  }

  showStudents(copy);
}

async function loadStudents() {
  const errorMessage = document.getElementById("errorMessage");
  try {
    const res = await fetch("students.json");
    if (res.ok === false) {
      throw new Error("Server answered " + res.status);
    }
    allStudents = await res.json();
    sortAndShow();
  } catch (error) {
    errorMessage.textContent = "Could not load students: " + error.message;
  }
}

const registrationForm = document.getElementById("registrationForm");

if (registrationForm !== null) {
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
}

const welcomeMessage = document.getElementById("welcomeMessage");

if (welcomeMessage !== null) {
  const params = new URLSearchParams(window.location.search);
  const studentName = params.get("name");

  if (studentName === null || studentName === "") {
    welcomeMessage.textContent = "Welcome, guest";
  } else {
    welcomeMessage.textContent = "Welcome, " + studentName;
  }

  document.getElementById("loadTime").textContent =
    "Page loaded at " + new Date().toLocaleTimeString();

  document.getElementById("sortSelect").addEventListener("change", sortAndShow);

  document.getElementById("backButton").addEventListener("click", function () {
    history.back();
  });

  loadStudents();
}

console.log("A85204925001");