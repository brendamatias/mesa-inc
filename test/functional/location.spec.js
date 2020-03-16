const { test, trait, afterEach } = use("Test/Suite")("Location");

const User = use("App/Models/User");
const Location = use("App/Models/Location");

trait("Test/ApiClient");
trait("Auth/Client");

afterEach(async () => {
  await User.query().delete();
  await Location.query().delete();
});

test("get locations with auth", async ({ client }) => {
  await User.create({
    name: "Brenda",
    email: "brenda@mesainc.com.br",
    password: "123456"
  });

  const user = await User.findBy("email", "brenda@mesainc.com.br");

  const response = await client
    .get("/locations")
    .loginVia(user)
    .end();

  response.assertStatus(200);
});

test("get locations without auth", async ({ client, assert }) => {
  const response = await client.get("/locations").end();

  response.assertStatus(401);
});

test("create a new location", async ({ client }) => {
  await User.create({
    name: "Brenda",
    email: "brenda@mesainc.com.br",
    password: "123456"
  });

  const user = await User.findBy("email", "brenda@mesainc.com.br");

  await client
    .post("/locations")
    .loginVia(user)
    .send({
      name: "Central do Pet",
      address:
        "R. Real da Torre, 459 - Madalena, Recife - PE, 50610-000, Brasil",
      latitude: -8.0529313,
      longitude: -34.9090256
    })
    .end();

  const response = await client
    .get("/locations")
    .loginVia(user)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      name: "Central do Pet",
      address:
        "R. Real da Torre, 459 - Madalena, Recife - PE, 50610-000, Brasil",
      user_id: user.id
    }
  ]);
});

test("do not create a new location", async ({ client, assert }) => {
  const response = await client
    .post("/locations")
    .send({
      name: "Central do Pet",
      address:
        "R. Real da Torre, 459 - Madalena, Recife - PE, 50610-000, Brasil",
      latitude: -8.0529313,
      longitude: -34.9090256
    })
    .end();

  response.assertStatus(401);

  //Creating a new location without token
  response.assertError(
    "InvalidJwtToken: E_INVALID_JWT_TOKEN: jwt must be provided"
  );
});
