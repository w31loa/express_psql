import Router from 'express'
import TeapotController from '../controller/teapot.controller.js'

const teapotController = new TeapotController

const  router = new Router()

 router.post('/teapot',  (req,res)=>{
    teapotController.createTeapot(req,res)
      
})
router.get('/teapot', (req,res)=>{
    teapotController.getAll(req,res)
})
router.delete('/teapot/:id', (req,res)=>{
    teapotController.deleteTeapot(req,res)
})
router.get('/teapot/sort/:by/:order', (req,res)=>{
    teapotController.sortTeapotsById(req,res)
})

router.get('/teapot/select/:by/:value', (req,res)=>{
    teapotController.selectTeapot(req,res)
})
router.get('/teapot/search/:by/:value', (req,res)=>{
    teapotController.searchTeapot(req,res)
})
router.put('/teapot/update', (req,res)=>{
    teapotController.updateTeapot(req,res)
})

export default router   