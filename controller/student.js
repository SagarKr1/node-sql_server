const msSqlConnect = require('../dataBase/dbCon');

const Student =async (req,res)=>{
    try{
        const pool = await msSqlConnect();
        const data = pool.request().query('select * from student');
        console.log(data);
        data.then(res1=>{
            return res.json({
                statusCode:200,
                body:res1.recordsets
            });
        })
    }catch(e){
        return res.json({
            statusCode:500,
            body:e.message
        });
    }

}

module.exports = Student;