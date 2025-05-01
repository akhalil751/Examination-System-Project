document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  var Fname = document.getElementById("FN").value;
  var Lname = document.getElementById("LN").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var Cpassword = document.getElementById("RP").value;

  var isValid = true;

  if (!validateFirstName()) isValid = false;
  if (!validateLastName()) isValid = false;
  if (!validateEmail()) isValid = false;
  if (!validatePassword()) isValid = false;
  if (!validateConfirmPassword()) isValid = false;

  if (isValid) {
    localStorage.setItem("firstName", Fname);
    localStorage.setItem("lastName", Lname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    location.replace("../index.html");
    // window.location.href = "../index.html";
  }
});

document.getElementById("FN").addEventListener("input", validateFirstName);
document.getElementById("LN").addEventListener("input", validateLastName);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("password").addEventListener("input", validatePassword);
document
  .getElementById("RP")
  .addEventListener("input", validateConfirmPassword);

function validateFirstName() {
  var FnameInput = document.getElementById("FN");
  var errorSpan = FnameInput.previousElementSibling;
  var Fname = FnameInput.value;

  if (Fname === "") {
    errorSpan.textContent = "*This field is required";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else if (isFinite(Fname)) {
    errorSpan.textContent = "*This field must contain characters only";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

function validateLastName() {
  var LnameInput = document.getElementById("LN");
  var errorSpan = LnameInput.previousElementSibling;
  var Lname = LnameInput.value;

  if (Lname === "") {
    errorSpan.textContent = "*This field is required";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else if (isFinite(Lname)) {
    errorSpan.textContent = "*This field must contain characters only";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

function validateEmail() {
  var emailInput = document.getElementById("email");
  var errorSpan = emailInput.previousElementSibling;
  var email = emailInput.value;
  const emailRegex = /^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

  if (email === "") {
    errorSpan.textContent = "*This field is required";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else if (!emailRegex.test(email)) {
    errorSpan.textContent = "Invalid email format";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

function validatePassword() {
  var passwordInput = document.getElementById("password");
  var errorSpan = passwordInput.previousElementSibling;
  var password = passwordInput.value;

  if (password === "") {
    errorSpan.textContent = "*This field is required";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else if (password.length < 8) {
    errorSpan.textContent = "Password must be at least 8 characters";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}

function validateConfirmPassword() {
  var password = document.getElementById("password").value;
  var CpasswordInput = document.getElementById("RP");
  var errorSpan = CpasswordInput.previousElementSibling;
  var Cpassword = CpasswordInput.value;

  if (Cpassword === "") {
    errorSpan.textContent = "*This field is required";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else if (Cpassword !== password) {
    errorSpan.textContent = "Passwords do not match";
    errorSpan.style.display = "inline";
    errorSpan.style.color = "red";
    return false;
  } else {
    errorSpan.textContent = "";
    return true;
  }
}
