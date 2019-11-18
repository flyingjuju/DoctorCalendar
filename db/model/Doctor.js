const mongoose = require('mongoose');
const faker = require('faker');

const doctorSchema = new mongoose.Schema({
    id: {type:Number, uniqe:true},
    doctorID: Number,
    fname: String,
    lname: String,
    email: String,
    calendar: {}  
});

const Doctor = mongoose.model('Doctor', doctorSchema);

var generateData = () => {
    let appointment = {calendar:{}}
    let doctorID = faker.random.number();
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    
    let reserveTime = Date.now();

    let patientId = faker.random.number();
    appointment.doctorID =  doctorID;
    appointment.fname =  firstName;
    appointment.lname =  lastName;
    appointment.email =  email;
    if(appointment.calendar[reserveTime] === undefined){
        appointment.calendar[reserveTime] = [patientId]
    }  else if (appointment.calendar[reserveTime].length<=3){
        appointment.calendar[reserveTime].push(patientId)
    }
    return appointment;
}

for(let i=1; i<=5; i++){
    Doctor.create(generateData()),(err,res)=>{
        if(err){
            console.log(err)
        } else {
            mongoose.connection.close();
        }
    }
}

module.exports = Doctor;