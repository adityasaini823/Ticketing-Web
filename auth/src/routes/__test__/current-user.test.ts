import request from "supertest"
import { app } from "../../app";

it("give the logged in user details", async () => {
    const authresponse= await  request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.com",
        password: "password"
    })
    .expect(201);
    const cookie = authresponse.get("Set-Cookie");
    if (!cookie) {
        console.log("Cookie not set after signup",authresponse.body);
        throw new Error("Cookie not set after signup");
    }
    const response= await request(app)
        .get("/api/users/currentuser")
        .set("Cookie", cookie)
        .send({})
        .expect(200);
    expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("when the user is not logged in", async () => {
    const response= await request(app)
        .get("/api/users/currentuser")
        .send({})
        .expect(200);
    expect(response.body.currentUser).toEqual(null);
});