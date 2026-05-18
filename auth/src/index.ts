import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from "cookie-session";
import mongoose from 'mongoose';
const app= express();
    
app.set("trust proxy", true);
app.use(cookieSession({
    signed: false,
    secure: true
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
const start = async () => {
    try{
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
        console.log("Connected to MongoDB");
    }catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{
        console.log("Listening on port 3000");
    });
}
start();

    