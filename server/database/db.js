const mysql = require('mysql')
const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'',
    database: "onedb"
})

conexion.connect((error)=>{
    if(error) {
        console.log('Ocurrio un error'+error)
        return
    }
    console.log('Successful Connection!!!!!!!!!!!')
})

module.exports = conexion