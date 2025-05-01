document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector('button[type="submit"]');

  function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 8;
  }

  function showError(input, message) {
    let errorElement = input.parentElement.querySelector(".error-message");

    if (!errorElement) {
      errorElement = document.createElement("p");
      errorElement.className = "error-message";
      errorElement.style.color = "red";
      errorElement.style.fontSize = "12px";
      errorElement.style.marginTop = "5px";
      errorElement.style.marginBottom = "0";
      errorElement.style.position = "absolute";
      errorElement.style.top = "calc(100% - 3px)";
      errorElement.style.left = "0";
      errorElement.style.width = "100%";
      input.parentElement.appendChild(errorElement);
      input.parentElement.style.marginBottom = "35px";
    }

    errorElement.textContent = message;
    input.style.borderColor = "red";
  }

  function removeError(input) {
    const errorElement = input.parentElement.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
      input.parentElement.style.marginBottom = "20px";
    }
    input.style.borderColor = "";
  }

  emailInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      removeError(this);
    } else if (!validateEmail(this.value)) {
      showError(this, "Please enter a valid email address");
    } else {
      removeError(this);
    }
  });

  passwordInput.addEventListener("input", function () {
    if (this.value.trim() === "") {
      removeError(this);
    } else if (!validatePassword(this.value)) {
      showError(this, "Password must be at least 8 characters");
    } else {
      removeError(this);
    }
  });

  loginForm.addEventListener("submit", function (event) {
    let isValid = true;

    if (!validateEmail(emailInput.value)) {
      showError(emailInput, "Please enter a valid email address");
      isValid = false;
    } else {
      removeError(emailInput);
    }

    if (!validatePassword(passwordInput.value)) {
      showError(passwordInput, "Password must be at least 8 characters");
      isValid = false;
    } else {
      removeError(passwordInput);
    }

    if (!isValid) {
      event.preventDefault();
    } else {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (
        emailInput.value === storedEmail &&
        passwordInput.value === storedPassword
      ) {
        event.preventDefault();
        location.replace("ExamPage/form_page.html");
        // window.location.href = "ExamPage/form_page.html";
      } else {
        showError(emailInput, "Incorrect email or password");
        showError(passwordInput, "Incorrect email or password");
        event.preventDefault();
      }
    }
  });
});
