import express from 'express';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
const app= express();
    
app.use(express.json());
app.use("/api/users", currentUserRouter);
app.use("/api/users", signinRouter);
app.use("/api/users", signupRouter);
app.use("/api/users", signoutRouter);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});
    