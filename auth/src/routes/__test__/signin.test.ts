import request from "supertest"
import { app } from "../../app";
import { get } from "node:http";

it("fails when a email that does not exist is supplied", async () => {
    return request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test123.com",
            password: "password"
        })
        .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);
    await  request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password1231"
        })
        .expect(400);
});
it("succeeds when a valid email and password are supplied", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);
    const response= await  request(app)
        .post("/api/users/signin")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(200);
    expect(response.get("Set-Cookie")).toBeDefined();
});

