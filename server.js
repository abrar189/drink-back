'use strict'

require('dotenv').config();


const express = require ('express');
const cors =require ('cors');
const app = express();
const mongoose =require ('mongoose');
const PORT=process.env.PORT
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true });
const user=require('./moduls/Database.modul')
const {dataFromDB ,dataFromAPI,addTOfavfun,deletefun,updateFav}=require('./controller/Datadb.controller')

// http://localhost:8000
app.get('/',(req,res)=>{
  res.send('hiiii')
})

// http://localhost:8000/datadb
app.get('/datadb',dataFromDB)

// http://localhost:8000/dataApi
app.get('/dataApi',dataFromAPI)

// http://localhost:8000/addTOfav
app.post('/addTOfav',addTOfavfun)

// http://localhost:8000/delete/idx
app.delete('/delete/:id',deletefun)

// http://localhost:8000/update/idx
app.put('/update/:idx', updateFav)



app.listen(PORT,()=>{
  console.log(`listen to ${PORT}`);
})

