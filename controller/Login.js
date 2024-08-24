const msSqlConnect = require('../dataBase/dbCon');


const updateToken =async (id,deviceToken)=>{
    try{
        const pool = await msSqlConnect();
        const data =await  pool.request();
        await data.query(`update userTable set token ='${deviceToken}' where enroll_no='${id}'`);
        return true
    }catch(e){
        return false;
    }

}
const Login =async (req,res)=>{
    try{
        const {id,password,deviceToken} = req.body;
        console.log(req.body);
        if(id=="" || password=="" || deviceToken==""){
            return res.json({
                statusCode:400,
                body:"data should not be empty"
            })
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

        if(data1['password']==password){
            if(data1['verify']==true){
                const update = await updateToken(id,deviceToken);
                console.log(update);
                return res.json({
                    statusCode:200,
                    body:data1
                });
            }else{
                return res.json({
                    statusCode:400,
                    body:"User not verified"
                });
            }
            
        }else{
            return res.json({
                statusCode:404,
                body:"Id or password is incorrect"
            });
        }
    }catch(e){
        return res.json({
            statusCode:500,
            body:e.message
        });
    }

}

module.exports = Login;


async function fcmDeviceToken(deviceToken){
    try{
        console.log(deviceToken);
        return true;
    }catch(e){
        return false;
    }
}