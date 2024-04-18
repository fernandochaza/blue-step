function disableRequiredFields() {
  const signUpForm = document.getElementById("sign-up-form");

  const formFields = [
    "address",
    "email",
    "emergency-contact",
    "last-name",
    "name",
    "password",
    "password-confirmation",
    "phone",
  ];

  formFields.forEach((field) => signUpForm[field].removeAttribute("required"));
}

function handlePasswordMatch(
  passwordInput,
  passwordConfirmationInput,
  passwordError,
  passwordConfirmationError
) {
  passwordInput.addEventListener("input", (e) => {
    const password = e.target.value;
    const passwordConfirmation = passwordConfirmationInput.value;

    if (password !== passwordConfirmation) {
      passwordError.textContent = "Passwords do not match";
      passwordError.style.display = "block";
    } else {
      passwordError.textContent = "";
      passwordConfirmationError.textContent = "";
    }
  });

  passwordConfirmationInput.addEventListener("input", (e) => {
    const password = passwordInput.value;
    const passwordConfirmation = e.target.value;

    if (password !== passwordConfirmation) {
      passwordConfirmationError.textContent = "Passwords do not match";
      passwordConfirmationError.style.display = "block";
    } else {
      passwordConfirmationError.textContent = "";
      passwordError.textContent = "";
    }
  });
}

function handleSubmitButton(form) {
  const submitButton = form.querySelector("button[type='submit']");
  submitButton.setAttribute("disabled", true);

  const emailInput = form.querySelector("#email");
  const nameInput = form.querySelector("#name");

  const passwordInput = form.querySelector("#password");
  const passwordConfirmationInput = form.querySelector("#password-confirmation");

  form.addEventListener("input", (e) => {
    const email = emailInput.value;
    const name = nameInput.value;
    const password = passwordInput.value;
    const passwordConfirmation = passwordConfirmationInput.value;

    if (email && name && password && passwordConfirmation && password === passwordConfirmation) {
      submitButton.removeAttribute("disabled");
    } else {
      submitButton.setAttribute("disabled", true);
    }
  });
}

function handleEmailInput(emailInput, emailError) {
  emailInput.addEventListener("input", (e) => {
    const email = e.target.value;

    if (!emailValidation(email)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
    } else {
      emailError.textContent = "";
    }
  });
}

function emailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export { handlePasswordMatch, handleSubmitButton, handleEmailInput, disableRequiredFields };
