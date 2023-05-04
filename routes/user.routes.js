import Router from 'express'
import UserController from '../controller/user.controller.js'

const userController = new UserController

const  router = new Router()

 router.post('/user',  (req,res)=>{
    userController.createUser(req,res)
      
})
router.get('/user', (req,res)=>{
    userController.getUser(req,res)
})
router.get('/user/:id', (req,res)=>{
    userController.getOneUser(req,res)
})
router.put('/user', (req,res)=>{
    userController.updateUser(req,res)
})
router.delete('/user/:id', (req,res)=>{
    userController.deleteUser(req,res)
})
router.get('/user/sort/id', (req,res)=>{
    userController.sortUsersById(req,res)
})

export default router