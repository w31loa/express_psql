import db from '../db.js'


export default class TeapotController{
    async createTeapot(req,res){
        const {title,volume,power,material} = req.body
        const newTeapot  = await db.query(`INSERT INTO teapot (title,volume,power,material) values ($1,$2,$3,$4) RETURNING *`, [title,volume,power,material])
         res.json(newTeapot.rows[0])
    }
    async getAll(req,res){
        const teapots = await db.query(`select * from teapot`)
        res.json(teapots.rows)

    }
    // async getOneUser(req,res){
    //     const id = req.params.id
    //     const user = await db.query(`select * from person where id = $1`, [id])
    //     res.json(user.rows[0])
    // }
    // async updateUser(req,res){
    //     const {id, name , surname} = req.body
    //     const user = await db.query(`update person set firstname = $1, surname = $2 where id = $3 RETURNING *`, [name, surname, id])
    //     res.json(user.rows[0])
    // }
    async deleteTeapot(req,res){
        const id = req.params.id
        const user = await db.query(`delete from teapot where id = $1`, [id])
        res.json(`user ${id} deleated`)
    }
    async sortTeapotsById(req,res){
        const by = req.params.by
        const order = req.params.order
        const users = await db.query(`select * from teapot order by ${by} ${order}`)
        res.json(users.rows)
     }
    async selectTeapot(req,res){
        const by = req.params.by
        const value = req.params.value
        const users = await db.query(`select * from teapot where ${by}=${value} `)
        res.json(users.rows)
     }
    async searchTeapot(req,res){
        const by = req.params.by
        const value = req.params.value
        const users = await db.query(`select * from teapot where ${by}::TEXT like '%${value}%'`)
        res.json(users.rows)
     }
}


