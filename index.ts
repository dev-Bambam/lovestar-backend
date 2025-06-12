import dotenv from 'dotenv'
dotenv.config()
import app from "./src/app";
import dbConnection from './config/db.config'

dbConnection()

const port = process.env.PORT 

app.listen(port, () => {
    console.log(`server listening at port:${port}`)
    // app.post("*", (req, res) => {
    //    console.log(req);
    // });
})

