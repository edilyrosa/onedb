const express = require('express')
const router = express.Router()
const conexion = require('./database/db')

//!INDEX.
router.get('/', (req, res)=>{
    
           res.render("index")
})

//!This query does the POST to Students' table, filling it.
router.get('/students', (req, res)=>{
    conexion.query("SELECT * FROM students", (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('students', {results:results})
        }
    })
})


//!This query does the POST to Inscriptions' table, filling it.
router.get('/inscriptions', (req, res)=>{
    conexion.query("SELECT * FROM inscriptions", (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('inscriptions', {results:results})
        }
    })
})


//!This query does the POST to Grades' table, filling it.
router.get('/gradeform', (req, res)=>{
    conexion.query("SELECT * FROM grades", (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('gradeform', {results:results})
        }
    })
})



//!This query does the PUT to Student's table, update it.
router.get('/editstudents/:id', (req, res)=>{
   const id = req.params.id
    conexion.query("SELECT * FROM students WHERE id=?", [id], (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('editstudents', {student:results[0]})
        }
    })
})

//!This query get all the student's created
router.get('/studentstable', (req, res)=>{
    conexion.query(
   "SELECT students.id, students.name, students.lastname, students.DNI, students.age, students.gender,"+ 
   "students.phone, students.email, students.address FROM students "

   , (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('studentstable', {results:results})
        }
    })
})


//!This query get all the Generl student's register (from 4 different tabls).
router.get('/reportStudents', (req, res)=>{
     conexion.query(
    // "SELECT students.id, students.name, students.lastname, students.DNI, students.age, students.gender, students.phone,"+
    // "students.email, students.address, inscriptions.id_course AS namecourse, inscriptions.id_level AS namelevel "+
    // "FROM students INNER JOIN inscriptions ON inscriptions.id_student = students.id "
    "SELECT students.id, students.name, students.lastname, students.DNI, students.age, students.gender, students.phone,"+
    "students.email, students.address, courses.name AS namecourse, levels.name AS namelevel "+
    "FROM inscriptions INNER JOIN students ON students.id = inscriptions.id_student "+  
                      "INNER JOIN courses ON courses.id = inscriptions.id_course "+
                      "INNER JOIN levels ON levels.id = inscriptions.id_level "
    , (error, results)=>{
         if(error){
             throw error
         } else {
            res.render('reportStudents', {results:results})
         }
     })
})



//!This query get all the student's grade from 2 different tabls
router.get('/gradereport', (req, res)=>{
    conexion.query(
        "SELECT students.id, students.name, students.lastname, students.DNI, grades.grade AS finalgrade FROM students "+
        "INNER JOIN grades ON grades.id_student = students.id"

   , (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('gradereport', {results:results})
        }
    })
})




const crud = require('./controllers/crud')
router.post('/save', crud.save)
router.post('/saveInscripcion', crud.saveInscripcion)
router.post('/saveGrade', crud.saveGrade)
router.post('/update', crud.update)

module.exports= router