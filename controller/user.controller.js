import db from '../db.js'


export default class UserController{
    async getAll(req,res){
        const teapots = await db.query(`select * from users`)
        res.json(teapots.rows)

    }
}
 

