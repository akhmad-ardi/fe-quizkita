import { describe, it, beforeAll, expect } from "vitest";
import { Auth } from "@/api/auth";
import { Class } from "@/api/class";

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

describe("Add Class Endpoint", () => {
  let token: string | undefined;

  beforeAll(async () => {
    const signIn = await Auth.SignIn({ username, password });
    token = signIn.data.data?.token;
  });

  it("[400] Add Class", async () => {
    const addClass = await Class.AddClass(token, { name: "" });

    expect(addClass.status).equal(400);
  });

  it("[401] Add Class", async () => {
    const addClass = await Class.AddClass("", { name: "" });

    expect(addClass.status).equal(401);
  });

  it("[201] Add Class", async () => {
    const addClass = await Class.AddClass(token, {
      name: `test_class_${Date.now()}`,
    });

    expect(addClass.status).equal(201);
  });
});

describe("Join Class Endpoint", () => {
  let token: string | undefined;
  let tokenOwner: string | undefined;
  let classId: string;

  beforeAll(async () => {
    const usernameJoin = `test_join_${Date.now()}`;

    await Auth.SignUp({
      username: usernameJoin,
      fullname: "test",
      password,
      confirm_password: password,
    });

    const signInJoin = await Auth.SignIn({
      username: usernameJoin,
      password,
    });
    token = signInJoin.data.data?.token;

    const signInOwnerClass = await Auth.SignIn({ username, password });
    tokenOwner = signInOwnerClass.data.data?.token;

    const addClass = await Class.AddClass(tokenOwner, {
      name: `test_class_${Date.now()}`,
    });
    classId = addClass.data.class_id;
  });

  it("[400] Join Class", async () => {
    const joinClaass = await Class.JoinClass(token, {
      invite_code: "",
    });

    expect(joinClaass.status).equal(400);
  });

  it("[401] Join Class", async () => {
    const joinClaass = await Class.JoinClass("", {
      invite_code: classId,
    });

    expect(joinClaass.status).equal(401);
  });

  it("[404] Join Class", async () => {
    const joinClaass = await Class.JoinClass(token, {
      invite_code: "class-id-not-found",
    });

    expect(joinClaass.status).equal(404);
  });

  it("[200] Join Class", async () => {
    const joinClaass = await Class.JoinClass(token, {
      invite_code: classId,
    });

    expect(joinClaass.status).equal(200);
  });

  it("[409] Join Class", async () => {
    const joinClaass = await Class.JoinClass(tokenOwner, {
      invite_code: classId,
    });

    expect(joinClaass.status).equal(409);
  });
});

describe("Add User to Class Endpoint", () => {
  let token: string | undefined;
  let classId: string;
  const usernameAddToUserClass = `test_add_to_user_class_${Date.now()}`;

  beforeAll(async () => {
    await Auth.SignUp({
      username: usernameAddToUserClass,
      fullname: "test",
      password,
      confirm_password: password,
    });

    const signIn = await Auth.SignIn({ username: username, password });
    token = signIn.data.data?.token;

    const addClass = await Class.AddClass(token, {
      name: `test_class_${Date.now()}`,
    });
    classId = addClass.data.class_id;
  });

  it("[400] Add User to Class", async () => {
    const addUserToClass = await Class.AddUserToClass(token, {
      classId,
      username: "",
    });

    expect(addUserToClass.status).equal(400);
  });

  it("[401] Add User to Class", async () => {
    const addUserToClass = await Class.AddUserToClass("", {
      classId,
      username: usernameAddToUserClass,
    });

    expect(addUserToClass.status).equal(401);
  });

  it("[404] Add User to Class", async () => {
    const addUserToClass = await Class.AddUserToClass(token, {
      classId,
      username: "xxx",
    });

    expect(addUserToClass.status).equal(404);
  });

  it("[200] Add User to Class", async () => {
    const addUserToClass = await Class.AddUserToClass(token, {
      classId,
      username: usernameAddToUserClass,
    });

    expect(addUserToClass.status).equal(200);
  });
});

describe("List Class's User Endpoint", () => {
  let token: string | undefined;

  beforeAll(async () => {
    const signIn = await Auth.SignIn({ username, password });
    token = signIn.data.data?.token;
  });

  it("[401] List Class's User", async () => {
    const getClasses = await Class.GetClasses("");

    expect(getClasses.status).equal(401);
  });

  it("[200] List Class's User", async () => {
    const getClasses = await Class.GetClasses(token);

    expect(getClasses.status).equal(200);
  });
});

describe("Delete Class Endpoint", () => {
  let token: string | undefined;
  let classId: string;

  beforeAll(async () => {
    const signIn = await Auth.SignIn({ username, password });
    token = signIn.data.data?.token;

    const addClass = await Class.AddClass(token, {
      name: `test_class_${Date.now()}`,
    });
    classId = addClass.data.class_id;
  });

  it("[404] Delete Class", async () => {
    const deleteClass = await Class.DeleteClass(token, {
      classId: "xxx",
    });

    expect(deleteClass.status).equal(404);
  });

  it("[200] Delete Class", async () => {
    const deleteClass = await Class.DeleteClass(token, {
      classId,
    });

    expect(deleteClass.status).equal(200);
  });
});
