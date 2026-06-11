import  request from "supertest";
import { app } from "../../app";
it("has a route handler listening on /api/tickets for post requests", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).toEqual(401);
});
it("returns a error other than 401 if the user is signed in", async () => {
    const response = await request(app).post("/api/tickets").send({});
    expect(response.status).not.toEqual(401);
});

it("returns a error  if a invalid title is provided", async () => {
     await request(app).post("/api/tickets")
    .set("Cookie",  global.signin())
    .send({
        title: "",
        price: 20
    })
    .expect(400);
});

it("returns a error  if a invalid price is provided", async () => {
    await request(app).post("/api/tickets")
    .set("Cookie",  global.signin())
    .send({
        title: "asdasd",
        price: -10
    })
    .expect(400);
});
it("returns a error  if a invalid price is provided", async () => {
     await request(app).post("/api/tickets")
    .set("Cookie",  global.signin())
    .send({
        title: "asdasd",
    })
    .expect(400);
});
it("creates a ticket if valid parameters are provided", async () => {
    const response = await request(app).post("/api/tickets")
    .set("Cookie",  global.signin())
    .send({
        title: "asdasd",
        price: 20
    });
    expect(response.status).toEqual(200);
});
