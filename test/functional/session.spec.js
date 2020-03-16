const { test, trait, afterEach } = use("Test/Suite")("Session");

const User = use("App/Models/User");

trait("Test/ApiClient");

afterEach(async () => {
  await User.query().delete();
});

test("successful user login", async ({ client, assert }) => {
  await User.create({
    name: "Brenda",
    email: "brenda@mesainc.com.br",
    password: "123456"
  });

  const response = await client
    .post("/sessions")
    .send({
      email: "brenda@mesainc.com.br",
      password: "123456"
    })
    .end();

  response.assertStatus(200);
});

test("unsuccessful user login", async ({ client, assert }) => {
  const response = await client
    .post("/sessions")
    .send({
      email: "brenda@mesainc.com.br",
      password: "123456"
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: "Email não cadastrado."
    }
  ]);

  await User.create({
    name: "Teste",
    email: "test@mesainc.com.br",
    password: "123456"
  });

  const responseTwo = await client
    .post("/sessions")
    .send({
      email: "test@mesainc.com.br",
      password: "12345"
    })
    .end();

  responseTwo.assertStatus(401);
  responseTwo.assertJSONSubset([
    {
      message: "Invalid user password"
    }
  ]);
});
