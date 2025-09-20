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

describe("Refresh Token Endpoint", () => {
  let accessToken: string | undefined;
  let refreshToken: string | undefined;

  beforeAll(async () => {
    const signIn = await Auth.SignIn({ username, password });
    accessToken = signIn.data.data?.accessToken;
    refreshToken = signIn.data.data?.refreshToken;
  });

  it("[403] Refresh Token", async () => {
    const refreshTokenRes = await Auth.RefreshToken({ refreshToken: "xxx" });

    expect(refreshTokenRes.status).equal(403);
  });

  it("[401] Refresh Token", async () => {
    const refreshTokenRes = await Auth.RefreshToken({ refreshToken: "" });

    expect(refreshTokenRes.status).equal(401);
  });

  it("[200] Refresh Token", async () => {
    const refreshTokenRes = await Auth.RefreshToken({
      refreshToken: refreshToken ?? "",
    });

    expect(refreshTokenRes.status).equal(200);
  });
});
