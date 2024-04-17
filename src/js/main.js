const signUpForm = document.getElementById("sign-up-form");

// Disable required attribute for testing purposes
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

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const JSONFormData = Object.fromEntries(formData.entries());
  signUpUser(JSONFormData);
});

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

    const responseData = await response.json();
  } catch (error) {
    console.error(error);
  }
}
