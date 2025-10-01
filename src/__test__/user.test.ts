import { describe, it, beforeAll, expect } from "vitest";

import { Auth } from "@/api/auth";
import { User } from "@/api/user";

const username = `test_${Date.now()}`;
const password = "123456";

describe("Get User", () => {
  let token: string | undefined;

  beforeAll(async () => {
    const dataSignUp = {
      username,
      fullname: "test",
      password,
      confirm_password: password,
    };

    await Auth.SignUp(dataSignUp);

    const signIn = await Auth.SignIn({ username, password });
    token = signIn.data.data?.token;
  });

  it("[401] Get User", async () => {
    const getUser = await User.GetUser("");

    expect(getUser.status).equal(401);
  });

  it("[200] Get User", async () => {
    const getUser = await User.GetUser(token);

    expect(getUser.status).equal(200);
  });
});
