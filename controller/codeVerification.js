const msSqlConnect = require('../dataBase/dbCon');

const updateVerify = async (id)=>{
    try{
        const pool = await msSqlConnect();
        const data =await  pool.request();
        await data.query(`update userTable set verify =1 where enroll_no='${id}'`);
        return true
    }catch(e){
        console.log(e);
        return false
    }
}

const CodeVerification = async (req,res)=>{
    try{
        const {id,verification_code} = req.body;
        if(id=="" || verification_code==""){
            return res.json({
                statusCode:404,
                body:"Data should not be empty"
            });
        }

        const pool = await msSqlConnect();
        const data =await  pool.request();
        const Sqlquery =await data.query(`select * from userTable where enroll_no='${id}'`);
        const data1 = Sqlquery.recordset;
        if(data1[0] == null){
            return res.json({
                statusCode:400,
                body:"Data not found"
            });
        }
        console.log(data1[0]['token'])
        if(data1[0]['token']!=verification_code){ 
            return res.json({
                statusCode:404,
                body:"Invalid code of enroll number"
            });
        }

        const update = await updateVerify(id);
        console.log(update);

        return res.json({
            statusCode:200,
            body:"code verified"
        });

    }catch(e){
        return res.json({
            statusCode:500,
            body:e.message
        });
    }
}

module.exports = CodeVerification;