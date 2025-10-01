import { describe, it, beforeAll, expect } from "vitest";

import { Auth } from "@/api/auth";

const username = `test_${Date.now()}`;
const password = "123456";

describe("No Test", () => {
  beforeAll(async () => {
    const dataSignUp = {
      username,
      fullname: "test",
      password,
      confirm_password: password,
    };

    await Auth.SignUp(dataSignUp);
  });

  it("Membuat akun", () => {
    expect(true).toBe(true);
  });
});
