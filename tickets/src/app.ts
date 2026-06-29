import express from 'express';
import { NotFoundError } from '@adityasaini2468/ticketing-common';
import { errorHandler } from '@adityasaini2468/ticketing-common';
import cookieSession from "cookie-session";
import { newTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';
import { currentUser } from '@adityasaini2468/ticketing-common';
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
app.use(currentUser);
app.use("/api/tickets", newTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app};
    
