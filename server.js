import express from 'express'
import path from 'path'
import teapotRouter from './routes/teapot.router.js'
import workshopRouter from './routes/workshop.router.js'
import detailRouter from './routes/detail.router.js'
import positionRouter from './routes/position.router.js'
import workerRouter from './routes/worker.router.js'
import userRouter from './routes/user.router.js'
import pdf from 'pdf-creator-node'
import fs from 'fs'


const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', teapotRouter)
app.use('/api', workshopRouter)
app.use('/api', detailRouter)
app.use('/api', positionRouter)
app.use('/api', workerRouter)
app.use('/api', userRouter)
app.use(express.static(path.resolve('static')))


app.get('/' ,(req,res)=>{
    // res.render('auth')
    res.json('123123')
})

app.listen(PORT, ()=>{
    console.log(`server working on ${PORT}...`)
})



