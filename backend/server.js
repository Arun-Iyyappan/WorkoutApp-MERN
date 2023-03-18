require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


const app = express()



app.use(express.json())
app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)
const url = process.env.MONG_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(process.env.PORT , () =>{
        console.log('listening!');
    })
})
.catch((error) => {
    console.log(error);
})


