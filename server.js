import express from 'express'
import path from 'path'
import teapotRouter from './routes/teapot.router.js'
import workshopRouter from './routes/workshop.router.js'
import detailRouter from './routes/detail.router.js'


const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', teapotRouter)
app.use('/api', workshopRouter)
app.use('/api', detailRouter)
app.use(express.static(path.resolve('static')))


app.get('/' ,(req,res)=>{
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`server working on ${PORT}...`)
})