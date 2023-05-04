import Router from 'express'
import DetailController from '../controller/detail.comtroller.js'

const detailController = new DetailController

const  router = new Router()

 router.post('/detail',  (req,res)=>{
    detailController.createDetail(req,res)
      
})
router.get('/detail', (req,res)=>{
    detailController.getAll(req,res)
})
router.delete('/detail/:id', (req,res)=>{
    detailController.deleteDetail(req,res)
})
router.get('/detail/sort/:by/:order', (req,res)=>{
    detailController.sortDetailById(req,res)
})

router.get('/detail/select/:by/:value', (req,res)=>{
    detailController.selectDetail(req,res)
})
router.get('/detail/search/:by/:value', (req,res)=>{
    detailController.searchDetail(req,res)
})
router.put('/detail/update', (req,res)=>{
    detailController.updateDetail(req,res)
})

export default router   