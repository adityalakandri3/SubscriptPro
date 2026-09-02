const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const app=express();




app.use(express.json());

const PORT = process.env.PORT || 3001;


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})