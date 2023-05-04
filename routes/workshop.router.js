import Router from 'express'
import WorkshopController from '../controller/workshop.controller.js'

const workshopController = new WorkshopController

const  router = new Router()

 router.post('/workshop',  (req,res)=>{
    workshopController.createWorkshop(req,res)
      
})
router.get('/workshop', (req,res)=>{
    workshopController.getAll(req,res)
})
router.delete('/workshop/:id', (req,res)=>{
    workshopController.deleteWorkshop(req,res)
})
router.get('/workshop/sort/:by/:order', (req,res)=>{
    workshopController.sortWorkshopsById(req,res)
})

router.get('/workshop/select/:by/:value', (req,res)=>{
    workshopController.selectWorkshop(req,res)
})
router.get('/workshop/search/:by/:value', (req,res)=>{
    workshopController.searchWorkshop(req,res)
})
router.put('/workshop/update', (req,res)=>{
    workshopController.updateWorkshop(req,res)
})

export default router   