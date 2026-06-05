import  request from "supertest";
import { app } from "../../app";
it("should return a 404 on an unknown route", async () => {
    await request(app).post("/api/tickets/sdfjbjv").send().expect(404);
});


