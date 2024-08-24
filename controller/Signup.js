const msSqlConnect = require('../dataBase/dbCon');
const SignUpMail = require('./mail/SignUpMail');

const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit random code
};

const Signup = async (req, res) => {
    try {
        const { email, roll, adhaar, phone, session, password } = req.body;
        console.log(req.body);
        if (email == "" && roll == "" && adhaar == "" && phone == "" && session == "" && password == "") {
            return res.json({
                statusCode: 400,
                body: "data Should not be empty"
            })
        }

        const pool = await msSqlConnect();
        const data = pool.request().query(`select * from student where enroll_no = '${roll}'`);
        console.log(data);
        data.then(async res1 => {
            console.log(res1.recordsets[0][0]['name']);
            if (res1.recordsets[0][0] == null) {
                return res.json({
                    statusCode: 404,
                    body: "data Not found"
                });
            }
            if (email == res1.recordsets[0][0]['email'] ||
                adhaar == res1.recordsets[0][0]['adhar_no'] ||
                phone == res1.recordsets[0][0]['phone'] ||
                roll == res1.recordsets[0][0]['enroll_no'] ||
                session == res1.recordsets[0][0]['session']
            ) {
                const code = await generateVerificationCode();
                const response = await sign(res1.recordsets[0][0], password,code);
                if (response == true) {
                    const mail = SignUpMail(code, email);
                    if (mail.status == false) {
                        return res.json({
                            statusCode: 404,
                            body: "Mail error"
                        });
                    }
                    return res.json({
                        statusCode: 200,
                        body: "data Created"
                    });
                } else {
                    return res.json({
                        statusCode: 200,
                        body: "something went wrong"
                    });
                }

            } else {
                return res.json({
                    statusCode: 400,
                    body: "Input Data is incorrect"
                });
            }
        })
    } catch (e) {
        return res.json({
            statusCode: 500,
            body: e.message
        });
    }

}

module.exports = Signup;


async function sign(data, password,code) {
    try {
        console.log(data);
        const pool = await msSqlConnect();
        pool.request()
            .query(`INSERT INTO userTable (enroll_no, email, phone, session, name, department, password, token,verify)
VALUES ('${data.enroll_no}', '${data.email}', ${data.phone}, '${data.session}', '${data.name}', '${data.department}', '${password}', '${code}',0)`);
        return true;
    } catch (e) {
        return false;
    }
}

