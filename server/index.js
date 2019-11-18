const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../db/index');
const Doctor = require('../db/model/Doctor')

app.use(bodyParser.json())

// list all doctors
app.get('/',(req,res)=>{
    Doctor.find()
    .then(data=> res.status(200).json(data))
    .catch(err=> res.status(500).json(err))
})

// list all appointment with a particular doctor with a particular day
// unique doctor id and timestamp
app.get('/:doctorId/:date',(req,res)=>{
    const {doctorId,date} = req.param;
    Doctor.find({
        $and:[
            {"doctorId":doctorId},
            {"calendar":{date:{$exists:true}}}
        ]      
    })
    .then(data=> res.status(200).json(data))
    .catch(err=> res.status(500).json(err))
})

app.post('/:doctorId/:patientId/:date',(req,res)=>{
    const {doctorId,patientId,date} = req.param;
    User.findOneAndUpdate({"doctorId":doctorId},{$push:{calendar:{date:patientId}}})
    .then(data=> res.status(200).json(data))
    .catch(err => res.status(500).json(err))
})


app.listen(PORT, console.log(`Server listening on port ${PORT}`));