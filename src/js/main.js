import { mockAPICreate, mockAPISave } from "./mockAPI.js";

function main() {
  // Disable required fields for the sign-up form for testing purposes
  disableRequiredFields();

  // This demonstrates custom validation
  handleEmailInput();
  handlePasswordMatch();
  handleSubmitButton();

  const signUpForm = document.getElementById("sign-up-form");
  handleFormSubmit(signUpForm);
}

function handleFormSubmit(signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const JSONFormData = parseFormToJSON(signUpForm);

    // try {
    //   const signUpResponse = await signUpUser(JSONFormData);
    //   console.log(signUpResponse);
    // } catch (error) {
    //   console.log("This request failed because it is a fake call. This is the form data: ");
    //   console.log(JSONFormData);
    //   console.error(error); // Here we could handle errors that aren't related to the API response
    // }

    try {
      const createUserResponse = await mockAPICreate(JSONFormData);
      console.log(createUserResponse);
    } catch (error) {
      console.error(error);
    }

    try {
      const saveUserResponse = await mockAPISave(JSONFormData);
      console.log(saveUserResponse);
    } catch (error) {
      console.error(error);
    }
  });
}

function parseFormToJSON(form) {
  const formData = new FormData(form);
  const JSONFormData = Object.fromEntries(formData.entries());
  return JSONFormData;
}

async function signUpUser(data) {
  const API_URL = "https://domain.com/api/v1/users";
  const API_HEADERS = {
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: API_HEADERS,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up user"); // We could also check the response status and throw a more specific error
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw error; // This rethrows the error so that the caller can handle it
  }
}

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

function emailValidation(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Function to demonstrate custom validation for email input
 */
function handleEmailInput() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");

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

function handlePasswordMatch() {
  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById("password-confirmation");
  const passwordError = document.getElementById("password-error");
  const passwordConfirmationError = document.getElementById("password-confirmation-error");

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

function handleSubmitButton() {
  const form = document.getElementById("sign-up-form");

  const submitButton = document.getElementById("submit-btn");

  const emailInput = document.getElementById("email");
  const nameInput = document.getElementById("name");

  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById("password-confirmation");

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

main();
