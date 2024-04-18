function main() {
  // Disable required fields for the sign-up form for testing purposes
  disableRequiredFields();

  // This demonstrates custom validation
  handleEmailInput();

  const signUpForm = document.getElementById("sign-up-form");
  handleFormSubmit(signUpForm);
}

function handleFormSubmit(signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const JSONFormData = Object.fromEntries(formData.entries());

    try {
      const signUpResponse = await signUpUser(JSONFormData);
      console.log(signUpResponse);
    } catch (error) {
      console.log("This request failed because it is a fake call. This is the form data: ");
      console.log(JSONFormData);
      console.error(error); // Here we could handle errors that aren't related to the API response
    }
  });
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

function mockAPI() {
  
}

main();
