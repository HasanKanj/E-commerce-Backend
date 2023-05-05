import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import reservationRoute from './routes/reservationRoute.js'
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/userRoute.js';
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import carsRoute from "./routes/carsRoute.js";
import contactRoute from "./routes/contactRoute.js";
import aboutRoute from "./routes/aboutRoute.js";
import testimonialRoute from "./routes/testimonialRoute.js";
import contactAdminRoute from "./routes/contactAdminRoute.js";

// Load environment variables
dotenv.config();
await db();
const app = new express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Set up middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up routes
app.use("/api/cars", carsRoute);
app.use('/api/contact', contactRoute);
app.use("/api/about", aboutRoute);
app.use("/api/testimonial", testimonialRoute);
app.use('/api/Reservations', reservationRoute);
app.use('/api/user', userRoute);
app.use("/api/contactAdmin",contactAdminRoute);



// Set up error handling middleware
app.use(notFound);
app.use(errorHandler);


if (process.env.NODE_ENV === "development") {
  app.use(morgan('dev'));
}

// Start server
app.listen(PORT, () => {
  console.log(`API IS RUNNING ON PORT: ${PORT}`);
});
