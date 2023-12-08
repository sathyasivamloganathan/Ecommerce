// const express = require('express')
import express from "express";
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDb from './config/db.js'
import authroute from './routes/authroute.js'
import cors from 'cors'
import categoryRoute from './routes/categoryRoutes.js'
import productRoute from './routes/productRoute.js'
import path from "path"
import { fileURLToPath } from 'url';

dotenv.config();


const app = express();
connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

app.use('/api/v1/auth', authroute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/product', productRoute)


app.use('#', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
