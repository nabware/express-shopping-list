const request = require("supertest");

const app = require("../../app");
let { items } = require("../../fakeDb");

let popsicle = {
  "name": "popsicle",
  "price": 1.25
};

beforeEach(function () {
  items.push(popsicle);
  console.log(items)
});

afterEach(function () {
  // items = [];
  items.length = 0;
});

/** GET /items - returns `{items: [item, ...]}` */

describe("GET /items", function () {
  it("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);

    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({ items: [popsicle] });
  });
});

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
  it("Creates a new item", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Chocolate",
        price: 4
      });
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: {
        name: "Chocolate",
        price: 4
      }
    });
  });

  it("Fail to create new item with missing name", async function () {
    const resp = await request(app)
      .post(`/items`)
      .send({
        price: 4
      });
    expect(resp.statusCode).toEqual(400);
    expect(resp.body).toEqual({
      error: {
        message: "Missing name and/or price.",
        status: 400
      }
    });
  });
});

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function () {
  it("Updates a single item", async function () {
    const resp = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({
        name: "Skittles"
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      updated: { name: "Skittles", price: popsicle.price }
    });
  });

  it("Responds with 404 if name invalid", async function () {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

/** DELETE /items/:name - delete item,
 *  return `{message: "Deleted"}` */

describe("DELETE /items/:name", function () {
  it("Deletes a single item", async function () {
    console.log(popsicle.name)
    const resp = await request(app)
      .delete(`/items/${popsicle.name}`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(items.length).toEqual(0);
  });
});
