const express = require('express')
const router = express.Router()
const conexion = require('./database/db')

//!INDEX.
router.get('/', (req, res)=>{
    
           res.render("index")
})

//!This query does the POST to STUDENTS' table, filling it.
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

 //!This query get the student
 router.get('/formSingleStudent', (req, res)=>{
     conexion.query("SELECT * FROM students", (error, results)=>{
         if(error){
             throw error
         } else {
            res.render('formSingleStudent', {results:results})
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
           res.render(`editstudents`, {student:results[0]})
        }
    })
})


//!This query does the DELETE to Student's table, update it.
router.get('/delete/:id', (req, res)=>{
    const id = req.params.id
     conexion.query("DELETE FROM students WHERE id=?", [id], (error, results)=>{
         if(error){
             throw error
         } else {
            res.redirect("http://localhost:5000/studentstable")
         }
     })
 })
 


//!This query get the specific student's register (from 4 different tabls: students, courses, levels, inscriptions).
router.get('/singleStudent/:id', (req, res)=>{ 
    const id = req.params.id
    conexion.query(

        "SELECT students.id, students.name, students.lastname, students.DNI, students.age, "+
         "students.gender, students.phone, students.email, students.address, "+
         "courses.name AS namecourse, levels.name AS namelevel, grades.grade AS grade, "+
         "inscriptions.id AS id_inscription FROM inscriptions "+
         "INNER JOIN students ON students.id = inscriptions.id_student "+
         "INNER JOIN courses ON courses.id = inscriptions.id_course "+
         "INNER JOIN levels ON levels.id = inscriptions.id_level "+
         "INNER JOIN grades ON grades.id_inscription = inscriptions.id WHERE students.id=? ORDER BY grade desc"
 
      , [id], (error, results)=>{
         
    
    
    if(error){
            throw error
        } else {
           res.render('singleStudent', {results:results})
        }
    })
})


//!This query get all the student's created
router.get('/studentstable', (req, res)=>{
    conexion.query(
   "SELECT students.id, students.name, students.lastname, students.DNI, students.age, students.gender,"+ 
   "students.phone, students.email, students.address FROM students ORDER BY id"

   , (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('studentstable', {results:results})
        }
    })
})

//!This query get the Report Enrrollment.
router.get('/inscriptionTable', (req, res)=>{
    conexion.query(
       "SELECT students.id, students.name, students.lastname, students.DNI, "+
       "students.age, students.gender, students.phone, students.email, students.address,"+
       " courses.name AS namecourse, levels.name AS namelevel, inscriptions.id AS id_inscription"+
       " FROM inscriptions "+
        "INNER JOIN students ON students.id = inscriptions.id_student "+
        "INNER JOIN courses ON courses.id = inscriptions.id_course "+
        "INNER JOIN levels ON levels.id = inscriptions.id_level ORDER BY id_inscription"
   , (error, results)=>{
        if(error){
            throw error
        } else {
           res.render('inscriptionTable', {results:results})
        }
    })
})



//!This query get all the General student's register (from 4 different tabls: students, courses, levels, inscriptions).
router.get('/reportStudents', (req, res)=>{
     conexion.query(
    "SELECT students.id, students.name, students.lastname, students.DNI, students.age, students.gender, students.phone,"+
    "students.email, students.address, courses.name AS namecourse, levels.name AS namelevel "+
    "FROM inscriptions INNER JOIN students ON students.id = inscriptions.id_student "+  
                      "INNER JOIN courses ON courses.id = inscriptions.id_course "+
                      "INNER JOIN levels ON levels.id = inscriptions.id_level ORDER BY id desc"
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

        "SELECT s.id, s.name, s.lastname, s.DNI, c.name course, l.name level, g.grade grade "+
        "FROM students s, courses c, levels l, inscriptions i, grades g "+
        "WHERE s.id = i.id_student "+
        "AND c.id = i.id_course AND l.id = id_level AND g.id_inscription = i.id ORDER BY grade desc"
        
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
router.post('/selectID', crud.selectID)

module.exports= router