const express = require('express') 
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
const PORT = process.env.PORT || 8081
const routes = require("./Routes/routes.js");

// To remove the CORS error
app.use(cors())
// To parse the body data into json 
app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/xharktank').then(() => {
    app.listen(PORT, function(err){
        if (err) console.log("Error in server setup")
        console.log("Server listening on Port", PORT);
    })
}).catch(err => {
    console.log(err);
})   

