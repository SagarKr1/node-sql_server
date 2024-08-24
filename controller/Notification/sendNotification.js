const admin = require('../firebase/firebase');
const msSqlConnect = require('../../dataBase/dbCon');

const sendNotification = async (req, res) => {
    try {
        const { title, body, department } = req.body;
        console.log(req.body);
        if (title == "" || body == "" || department == "") {
            return res.json({
                statusCode: 404,
                body: "data Should not be empty"
            });
        }
        const pool = await msSqlConnect();
        const data = await pool.request();

        let query = `select department ,token from userTable where department = '${department}'`;
        if (department == "all") {
            query = `select department ,token from userTable`;
        }

        const data1 = await data.query(query);
        if (data1['recordsets'][0][0] == null) {
            return res.json({
                statusCode: 404,
                body: "no data found"
            });
        }
        const notify = data1['recordsets'][0]
        notify.map(async (token) => {
            const message = {
                notification: {
                    title, body
                },
                token: token
            }

            const response = await admin.messaging().send(message);
        })
        return res.json({
            query,
            data: notify
        });
    } catch (e) {
        throw e;
    }
}

module.exports = sendNotification;