import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { NotFoundError } from '@adityasaini2468/ticketing-common';
import { errorHandler } from '@adityasaini2468/ticketing-common';
import cookieSession from "cookie-session";
import mongoose from 'mongoose';
const app= express();
    
app.set("trust proxy", true);
app.use(cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== "test",
    secure: process.env.NODE_ENV === "production",
    // If you are testing locally or using HTTP inside k8s without TLS termination,
    // keep secure false so the cookie can still be set by the browser.
}));
app.use(express.json());
app.use("/api/users", currentUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signupRouter);
app.use("/api/users", signoutRouter);

app.use(async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};
    