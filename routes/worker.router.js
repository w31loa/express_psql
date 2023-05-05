import Router from 'express'
import WorkerController from '../controller/worker.controller.js'

const workerController = new WorkerController

const  router = new Router()

 router.post('/worker',  (req,res)=>{
    workerController.createWorker(req,res)
      
})
router.get('/worker', (req,res)=>{
    workerController.getAll(req,res)
})
router.delete('/worker/:id', (req,res)=>{
    workerController.deleteWorker(req,res)
})
router.get('/worker/sort/:by/:order', (req,res)=>{
    workerController.sortWorkerById(req,res)
})

router.get('/worker/select/:by/:value', (req,res)=>{
    workerController.selectWorker(req,res)
})
router.get('/worker/search/:by/:value', (req,res)=>{
    workerController.searchWorker(req,res)
})
router.put('/worker/update', (req,res)=>{
    workerController.updateWorker(req,res)
})

export default router   