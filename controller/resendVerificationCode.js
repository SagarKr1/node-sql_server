const msSqlConnect = require('../dataBase/dbCon');
const mail = require('./mail/SignUpMail');

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit random code
};

const updateCode = async (id,code)=>{
    try{
        const pool = await msSqlConnect();
        const data =await  pool.request();
        await data.query(`update userTable set token =${code} where enroll_no='${id}'`);
        return true
    }catch(e){
        console.log(e);
        return false
    }
}

const ResendVerificationCode = async (req,res)=>{
    try{
        const {id} = req.body;

        if(id==""){
            return res.json({
                statusCode:404,
                body:"data should not be empty"
            });
        }
        const pool = await msSqlConnect();
        const data = await pool.request();
        const user = await data.query(`select * from userTable where enroll_no='${id}'`);
        const data1 = user['recordsets'][0][0];
        if(data1==null){
            return res.json({
                statusCode:404,
                body:"data not found"
            });
        }

        const code = await generateVerificationCode();
        const update = await updateCode(id,code);
        console.log(update);
        const email = await mail(code,data1['email']);

        console.log(email);

        return res.json({
            statusCode:200,
            body:"code sent"
        });
    }catch(e){
        return res.json({
            statusCode:500,
            body:e.message
        });
    }
}

module.exports= ResendVerificationCode;