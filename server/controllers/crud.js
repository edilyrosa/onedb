const conexion = require('../database/db')
//!Function to POST STUDENT'S FORM
 exports.save = (req, res)=>{
    const name = req.body.name
    const lastname = req.body.lastname
    const DNI = parseInt(req.body.DNI)
    const age = parseInt(req.body.age)
    const gender = req.body.gender
    const phone = parseInt(req.body.phone)
    const email = req.body.email
    const address = req.body.address
    conexion.query("INSERT INTO students SET ?", {name:name, lastname:lastname, DNI:DNI, age:age, gender:gender,
        phone:phone, email:email, address:address}, 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/studentstable')
        }
    })
 }

//!Function to POST STUDENT'S INSCRIPTION
exports.saveInscripcion = (req, res)=>{
    const id_student = parseInt(req.body.id_student)
    const id_course = parseInt(req.body.id_course)
    const id_level = parseInt(req.body.id_level)
    conexion.query("INSERT INTO inscriptions SET ?", {id_student:id_student, id_course:id_course, id_level:id_level}, 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/gradeform')
        }
    })
 }


 //!Function to POST STUDENT'S INSCRIPTION
exports.saveGrade = (req, res)=>{
    const id_student = parseInt(req.body.id_student)
    const grade = parseInt(req.body.grade)
    
    conexion.query("INSERT INTO grades SET ?", {id_student:id_student, grade:grade}, 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/gradereport') //!OJOOOOOOOOO qury fulll
        }
    })
 }

 
 //!Function to UPDATE STUDENT
 exports.update = (req, res)=>{
    const id = req.body.id

    const name = req.body.name
    const lastname = req.body.lastname
    const DNI = parseInt(req.body.DNI)
    const age = parseInt(req.body.age)
    const gender = req.body.gender
    const phone = parseInt(req.body.phone)
    const email = req.body.email
    const address = req.body.address
    conexion.query("UPDATE students SET ? WHERE id=?", [{name:name, lastname:lastname, DNI:DNI, age:age, gender:gender,
        phone:phone, email:email, address:address}, id], 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/studentstable')
        }
    })
 }
/*
//!Function to POST STUDENT
 exports.save = (req, res)=>{
    const name = req.body.name
    const lastname = req.body.lastname
    const DNI = parseInt(req.body.DNI)
    const age = parseInt(req.body.age)
    const gender = req.body.gender
    const phone = parseInt(req.body.phone)
    const email = req.body.email
    const address = req.body.address
    const id_course = parseInt(req.body.id_course)
    const id_level = parseInt(req.body.id_level)
    conexion.query("INSERT INTO student SET ?", {name:name, lastname:lastname, DNI:DNI, age:age, gender:gender,
        phone:phone, email:email, address:address, id_course:id_course, id_level:id_level}, 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/')
        }
    })
 }


 
 //!Function to UPDATE STUDENT
 exports.update = (req, res)=>{
    const id = req.body.id

    const name = req.body.name
    const lastname = req.body.lastname
    const DNI = parseInt(req.body.DNI)
    const age = parseInt(req.body.age)
    const gender = req.body.gender
    const phone = parseInt(req.body.phone)
    const email = req.body.email
    const address = req.body.address
    const id_course = parseInt(req.body.id_course)
    const id_level = parseInt(req.body.id_level)
    conexion.query("UPDATE students SET ? WHERE id=?", [{name:name, lastname:lastname, DNI:DNI, age:age, gender:gender,
        phone:phone, email:email, address:address, id_course:id_course, id_level:id_level}, id], 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/')
        }
    })
 }

*/




   