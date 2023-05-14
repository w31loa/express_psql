import db from '../db.js'


export default class WorkshopController{
    async createWorkshop(req,res){
        const {title,workers_amount} = req.body
        const newWorkshop  = await db.query(`INSERT INTO workshop (title,workers_amount) values ('${title}',${workers_amount}) RETURNING *`)
         res.json(newWorkshop.rows[0])
    }
    async getAll(req,res){
        const workshops = await db.query(`select * from workshop`)
        res.json(workshops.rows)

    }
    async deleteWorkshop(req,res){
        const id = req.params.id
        const user = await db.query(`delete from workshop where id = $1`, [id])
    }
    async sortWorkshopsById(req,res){
        const by = req.params.by
        const order = req.params.order
        await db.query(`select * from workshop order by ${by} ${order}`, (err,resp)=>{
            if(err){
                console.log(err.message)
            }else{
                res.json(resp.rows)

            }
        })
        
     }
    async selectWorkshop(req,res){
        const by = req.params.by
        const value = req.params.value
        await db.query(`select * from workshop where ${by}=${value} `, (err,resp)=>{
            if(err){
                console.log(err.message)
            }else{
                res.json(resp.rows)
            }
        })
   
     }
    async searchWorkshop(req,res){
        const by = req.params.by
        const value = req.params.value
        const users = await db.query(`select * from workshop where ${by}::TEXT like '%${value}%'`)
        res.json(users.rows)
     }
    async updateWorkshop(req,res){
        const {id, title,workers_amount} = req.body
        console.log(req.body)
        const user = await db.query(`update workshop set title = '${title}', workers_amount = ${workers_amount} where id = ${id}`)
     }
}
 

