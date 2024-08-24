const sql = require('mssql');
const { options } = require('../routes/routes');
require('dotenv').config();
// console.log(process.env);

const sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true,
        instancename: "SQLEXPRESS"
    },
    port: 1433
}


module.exports = msSqlConnect = async () => {
    try {
        const pool = await sql.connect(sqlConfig);
        return pool;
    } catch (e) {
        console.log(e.message);
        throw e;
    }
}