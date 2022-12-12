const express = require('express') 
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const PORT = process.env.PORT || 8081
const routes = require("./Routes/routes.js");
const DB_URI = process.env.DB_URI
// To remove the CORS error
app.use(cors())
// To parse the body data into json 
app.use(express.json());

app.use(routes);

mongoose.connect(DB_URI).then(() => {
    app.listen(PORT, function(err){
        if (err) console.log("Error in server setup")
        console.log("Server listening on Port", PORT);
    })
}).catch(err => {
    console.log(err);
})   

