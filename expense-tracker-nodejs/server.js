const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions')

var cors = require('cors')

const corsOptions = {
    origin: '*',
    credentials: true,
  }

const app = express();

app.use(cors(corsOptions),express.json())

if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}

app.use('/api/v1/transacations', transactions);

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV || "production"} mode on port ${PORT}`.green.bold))