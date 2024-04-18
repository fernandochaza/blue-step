export class UserHelper {
  create(userDataJSON) {
    try {
      const user = new User(userDataJSON);
      return { result: true, message: "User created successfully" };
    } catch (error) {
      return { result: false, message: error.message };
    }
  }

  save(user) {
    // Save user to database verifying required fields
    const requiredFields = ["email", "name"];
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!user[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields when saving user: ${missingFields.join(", ")}`);
    }

    // Save user to database
    return { result: true, message: "User saved successfully" };
  }
}

class User {
  constructor(userData) {
    const requiredFields = ["email", "name"];
    const missingFields = [];

    requiredFields.forEach((field) => {
      if (!userData[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields when creating user: ${missingFields.join(", ")}`);
    }

    this.age = userData.age;
    this.address = userData.address;
    this.dob = userData.dob;
    this.email = userData.email;
    this.emergencyContact = userData["emergency-contact"];
    this.lastName = userData["last-name"];
    this.name = userData.name;
    this.phone = userData.phone;
  }
}
