import request  from "supertest";
import { app } from "../../app";

it("returns a 201 on successful signup", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "password"
        })
        .expect(201);
});
it("returns a 400 on invalid email", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@exampl",
            password: "password"
        })
        .expect(400);
});
it("returns a 400 on invalid password", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "pass"
        })
        .expect(400);
});
it("returns a 400 on missing signup fields", async () => {
    return request(app)
        .post("/api/users/signup")
        .send({})
        .expect(400);
});
it("returns duplicate error", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(201);
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password"
        })
        .expect(400);
});
it("sets a cookie after successful signup", async () => {
    const response = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@example.com",
            password: "password"
        })
        .expect(201);
    expect(response.get("Set-Cookie")).toBeDefined();
});