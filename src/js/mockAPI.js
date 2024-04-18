import { UserHelper } from "./user-helper.js";

async function mockAPICreate(userDataJSON) {
  const userHelper = new UserHelper();

  try {
    const createUserResponse = userHelper.create(userDataJSON);
    if (!createUserResponse.result) {
      throw new Error(createUserResponse.message);
    }

    return createUserResponse;
  } catch (error) {
    throw error;
  }
}

async function mockAPISave(user) {
  const userHelper = new UserHelper();

  try {
    const saveUserResponse = userHelper.save(user);
    if (!saveUserResponse.result) {
      throw new Error(saveUserResponse.message);
    }

    return saveUserResponse;
  } catch (error) {
    throw error;
  }
}

export { mockAPICreate, mockAPISave };
