require('dotenv').config();
require('express-async-errors');

const bodyParser = require("body-parser");
const express = require("express");
//database
const connectDB = require('./db/connect');
//middleware
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')
//others
const cookieParser = require('cookie-parser');
//routes
const authRoutes = require('./routes/Auth/authRoutes');

const app = express();
app.use(cookieParser(process.env.JWT_SECRET))
app.use(bodyParser.json());

app.use('/api/v1/auth', authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
}

start();