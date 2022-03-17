const express = require('express');
const app = express();
const bodParser = require('body-parser');
const path = require('path');
const categoryRouter=require('./Routs/categoryRout');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.9ei6p.mongodb.net/pristdb?retryWrites=true&w=majority',()=>{
    console.log("caqsqodvnnng")
});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodParser.urlencoded({extended:true}));
app.use(bodParser.json());

app.use('/category',categoryRouter);

app.listen(3333);

