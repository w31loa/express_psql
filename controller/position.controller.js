import db from '../db.js'


export default class PositionController{
    async createPosition(req,res){
        const {position_name,clock_rate, hourly_rate} = req.body
        const newWorkshop  = await db.query(`INSERT INTO position (position_name,clock_rate,hourly_rate) values ('${position_name}',${clock_rate}, ${hourly_rate}) RETURNING *`)
         res.json(newWorkshop.rows[0])
    }
    async getAll(req,res){
        const workshops = await db.query(`select * from position`)
        res.json(workshops.rows)

    }
    async deletePosition(req,res){
        const id = req.params.id
        const user = await db.query(`delete from position where id = $1`, [id])
    }
    async sortPosition(req,res){
        const by = req.params.by
        const order = req.params.order
        await db.query(`select * from position order by ${by} ${order}`, (err,resp)=>{
            if(err){
                console.log(err.message)
            }else{
                res.json(resp.rows)

            }
        })
        
     }
    async selectPosition(req,res){
        const by = req.params.by
        const value = req.params.value
        await db.query(`select * from position where ${by}='${value}' `, (err,resp)=>{
            if(err){
                console.log(err.message)
            }else{
                res.json(resp.rows)

            }
        })
     }
    async searchPosition(req,res){
        const by = req.params.by
        const value = req.params.value
        const users = await db.query(`select * from position where ${by}::TEXT like '%${value}%'`)
        res.json(users.rows)
     }
    async updatePosition(req,res){
        const {id, position_name,clock_rate,hourly_rate} = req.body
        console.log(req.body)
        const user = await db.query(`update position set position_name = '${position_name}', clock_rate = ${clock_rate},hourly_rate=${hourly_rate}  where id = ${id}`)
     }
}
 

