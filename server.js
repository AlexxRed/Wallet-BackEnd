const app = require('./app')
const mongoose = require('mongoose');
const { DB_HOST } = process.env


mongoose.connect(DB_HOST)
    .then(()=>console.log("Database connection successful"))
    .catch(error => { 
        console.log(error.message);
        process.exit(1)
    })


app.listen((process.env.PORT || 5000), () => {
    console.log("Server running. Use our API on port: 5000")
})