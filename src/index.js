require('dotenv').config();
const express = require('express');
const route = require('./routes/route');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(route);

app.listen(process.env.PORT || 3001);