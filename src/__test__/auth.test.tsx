import { describe, it, beforeAll, expect } from "vitest";
import { Auth } from "../api/auth";

const username = `test_${Date.now()}`;
const password = "secretPassword123";

describe("Sign Up Endpoint", () => {
  it("[400] Sign Up", async () => {
    const dataSignUp = {
      username: "",
      fullname: "",
      password: "",
      confirm_password: "",
    };

    const signUp = await Auth.SignUp(dataSignUp);

    expect(signUp.status).equal(400);
  });

  it("[201] Sign Up", async () => {
    const dataSignUp = {
      username,
      fullname: "test",
      password,
      confirm_password: password,
    };

    const signUp = await Auth.SignUp(dataSignUp);

    expect(signUp.status).equal(201);
  });

  it("[409] Sign Up", async () => {
    const dataSignUp = {
      username,
      fullname: "test",
      password,
      confirm_password: password,
    };

    const signUp = await Auth.SignUp(dataSignUp);

    expect(signUp.status).equal(409);
  });
});

describe("Sign In Endpoint", () => {
  it("[400] Sign In", async () => {
    const dataSignIn = {
      username: "",
      password: "",
    };

    const signIn = await Auth.SignIn(dataSignIn);

    expect(signIn.status).equal(400);
  });

  it("[200] Sign In", async () => {
    const dataSignIn = {
      username,
      password,
    };

    const signIn = await Auth.SignIn(dataSignIn);

    expect(signIn.status).equal(200);
  });
});

describe("Validate Token Endpoint", () => {
  let token: string | undefined;

  beforeAll(async () => {
    const signIn = await Auth.SignIn({ username, password });
    token = signIn.data.data?.token;
  });

  it("[403] Validate Access Token", async () => {
    const validateTokenRes = await Auth.ValidateToken("xxx");

    expect(validateTokenRes.status).equal(403);
  });

  it("[200] Validate Access Token", async () => {
    const validateTokenRes = await Auth.ValidateToken(token);

    expect(validateTokenRes.status).equal(200);
  });
});
