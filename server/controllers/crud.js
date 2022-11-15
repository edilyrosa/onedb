const conexion = require('../database/db')
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
    conexion.query("UPDATE student SET ? WHERE id=?", [{name:name, lastname:lastname, DNI:DNI, age:age, gender:gender,
        phone:phone, email:email, address:address, id_course:id_course, id_level:id_level}, id], 
    (error, results)=>{
        if(error){
            console.log(error);
        } else {
           res.redirect('/')
        }
    })
 }
   