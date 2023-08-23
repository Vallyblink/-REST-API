import mongoose from "mongoose";
import "dotenv/config";
import request from "supertest";

import app from "../../app.js"

import User from "../../models/user.js";


const { PORT, DB_HOST } = process.env;

describe("auth test", () => {
    let server = null;

    beforeAll(async () => {
        await mongoose.connect(DB_HOST);
        server = app.listen(PORT)
    })

    afterAll(async () => {
        await mongoose.connection.close();
        server.close()
    })

    test("test login with correct data", async () => {
        const loginData = {
            email: "qwetrqy3@gmail.com",
            password: "1234567"
        }
        const { statusCode, body } = await request(app)
            .post('/users/login')
            .send(loginData);
        expect(statusCode).toBe(200);
        
        expect(typeof body.token).toBe('string');
       
        expect(typeof body.user).toBe('object');
        expect(body.user).toHaveProperty('email');
        expect(body.user).toHaveProperty('subscription');
        
        expect(typeof body.user.email).toBe('string');
        expect(typeof body.user.subscription).toBe('string');
       
        expect(body.user.email).toBe(loginData.email);
        expect(body.user.subscription).toBe("starter")
        
        const user = await User.findOne({ email: loginData.email })
        expect(user.token).toBe(body.token);
    })
})