import Router from 'express'
import PositionController from '../controller/position.controller.js'

const positionController = new PositionController

const  router = new Router()

 router.post('/position',  (req,res)=>{
    positionController.createPosition(req,res)
      
})
router.get('/position', (req,res)=>{
    positionController.getAll(req,res)
})
router.delete('/position/:id', (req,res)=>{
    positionController.deletePosition(req,res)
})
router.get('/position/sort/:by/:order', (req,res)=>{
    positionController.sortPosition(req,res)
})

router.get('/position/select/:by/:value', (req,res)=>{
    positionController.selectPosition(req,res)
})
router.get('/position/search/:by/:value', (req,res)=>{
    positionController.searchPosition(req,res)
})
router.put('/position/update', (req,res)=>{
    positionController.updatePosition(req,res)
})

export default router   