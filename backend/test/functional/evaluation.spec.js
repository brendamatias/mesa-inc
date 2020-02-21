const { test, trait, afterEach } = use("Test/Suite")("Evaluation");

const User = use("App/Models/User");
const Location = use("App/Models/Location");

trait("Test/ApiClient");
trait("Auth/Client");

afterEach(async () => {
  await User.query().delete();
  await Location.query().delete();
});

test("insert an evaluation", async ({ client, assert }) => {
  await User.create({
    name: "Brenda",
    email: "brenda@mesainc.com.br",
    password: "123456"
  });

  const user = await User.findBy("email", "brenda@mesainc.com.br");

  await Location.create({
    name: "Central do Pet",
    address: "R. Real da Torre, 459 - Madalena, Recife - PE, 50610-000, Brasil",
    latitude: -8.0529313,
    longitude: -34.9090256,
    user_id: user.id
  });

  const location = await Location.findBy("name", "Central do Pet");

  const response = await client
    .post(`/locations/${location.id}/evaluations`)
    .loginVia(user)
    .send({
      rating: 5,
      comment: "Ótimo lugar! Preço acessível, atendentes educados."
    })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    rating: 5,
    comment: "Ótimo lugar! Preço acessível, atendentes educados.",
    user_id: user.id
  });
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
