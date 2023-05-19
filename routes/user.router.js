import Router from 'express'
import UserController from '../controller/user.controller.js'

const userController = new UserController

const  router = new Router()

router.get('/users', (req,res)=>{
    userController.getAll(req,res)
})


export default router   