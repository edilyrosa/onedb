const express = require('express')
const router = express.Router()
const conexion = require('./database/db')

//!This query get all the student's register from 3 different tabls
router.get('/', (req, res)=>{
     conexion.query(
    "SELECT student.id, student.name, student.lastname, student.DNI, student.age, student.gender, student.phone,"+
    "student.email, student.address,course.name AS namecourse, level.name AS namelevel "+
    "FROM student INNER JOIN course ON course.id = student.id_course "+
    "INNER JOIN level ON level.id = student.id_level"

    , (error, results)=>{
         if(error){
             throw error
         } else {
            res.render('index', {results:results})
         }
     })
})


//!This query get all the student's grade from 3 different tabls
router.get('/grade', (req, res)=>{
    conexion.query(
   "SELECT student.id, student.name, student.lastname, student.DNI, course.name AS namecourse,"+
   " level.name AS namelevel, grade.grade AS finalgrade FROM student "+
   "INNER JOIN course ON course.id = student.id_course "+
   "INNER JOIN level ON level.id = student.id_level "+
   "INNER JOIN grade ON grade.id_student = student.id"

   , (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('gradereport', {results:results})
        }
    })
})



//!This query does the POST to Student's table, filling it.
router.get('/create', (req, res)=>{
    conexion.query("SELECT * from student", (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('create', {results:results})
        }
    })
})


const crud = require('./controllers/crud')
router.post('/save', crud.save)

module.exports= router