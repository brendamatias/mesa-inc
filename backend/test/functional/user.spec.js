const { test, trait, afterEach } = use("Test/Suite")("User");

const User = use("App/Models/User");

trait("Test/ApiClient");

afterEach(async () => {
  await User.query().delete();
});

test("create a new user", async ({ client, assert }) => {
  const response = await client
    .post("/users")
    .send({
      name: "Brenda",
      email: "brenda@mesainc.com.br",
      password: "123456"
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    name: "Brenda",
    email: "brenda@mesainc.com.br"
  });
});

test("do not create a new user", async ({ client, assert }) => {
  const response = await client.post("/users").end();

  response.assertStatus(400);

  const responseTwo = await client
    .post("/users")
    .send({
      email: "brenda@mesainc.com.br",
      password: "123456"
    })
    .end();

  responseTwo.assertError([
    {
      message: "O campo de nome não pode estar vazio.",
      field: "name",
      validation: "required"
    }
  ]);

  const user = await User.findBy("email", "brenda@mesainc.com.br");
  assert.isNull(user);
});
