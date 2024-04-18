import { mockAPICreate, mockAPISave } from "./mockAPI.js";
import {
  handleEmailInput,
  handlePasswordMatch,
  handleSubmitButton,
  disableRequiredFields,
} from "./validation.js";
import { parseFormToJSON } from "./utils.js";

function main() {
  // Disable required fields for the sign-up form for testing purposes
  disableRequiredFields();

  const signUpForm = document.getElementById("sign-up-form");

  // Next code block demonstrates custom validation. Commented out because it's not used in the final version
  // Uncomment to test

  /*
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("email-error");
  handleEmailInput(emailInput, emailError);

  const passwordInput = document.getElementById("password");
  const passwordConfirmationInput = document.getElementById("password-confirmation");
  const passwordError = document.getElementById("password-error");
  const passwordConfirmationError = document.getElementById("password-confirmation-error");
  handlePasswordMatch(
    passwordInput,
    passwordConfirmationInput,
    passwordError,
    passwordConfirmationError
  );

  handleSubmitButton(signUpForm);
  */

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
      alert(createUserResponse.message);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }

    try {
      const saveUserResponse = await mockAPISave(JSONFormData);
      console.log(saveUserResponse);
      alert(saveUserResponse.message);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  });
}

// Function to demonstrate a real API call. Not used in the final version
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

main();
