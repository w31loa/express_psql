import db from '../db.js'


export default class TeapotController{
    async createTeapot(req,res){
        const {title,volume,power,material, date} = req.body
        const newTeapot  = await db.query(`INSERT INTO teapot (title,volume,power,material,date) values ($1,$2,$3,$4,$5) RETURNING *`, [title,volume,power,material, date])
         res.json(newTeapot.rows[0])
    }
    async getAll(req,res){
        const teapots = await db.query(`select * from teapot`)
        res.json(teapots.rows)

    }
    async deleteTeapot(req,res){
        const id = req.params.id
        const user = await db.query(`delete from teapot where id = $1`, [id])
        res.json(`user ${id} deleated`)
    }
    async sortTeapotsById(req,res){
        const by = req.params.by
        const order = req.params.order
        await db.query(`select * from teapot order by ${by} ${order}`,(err,resp)=>{
            if(err){
                console.log(err.message)
            }else{
                res.json(resp.rows)
            }
        })
        
     }
    async selectTeapot(req,res, err){
        const by = req.params.by
        const value = req.params.value
        await db.query(`select * from teapot where ${by}='${value}' `, (err,resp)=>{
            if(err) {
                console.log(err.message)
            }else{
                res.json(resp.rows)
            }
          
        })
       
     }
    async searchTeapot(req,res){

            const by = req.params.by
            const value = req.params.value
            const users  = await db.query(`select * from teapot where ${by}::TEXT like '%${value}%'`)
          
            res.json(users.rows)
      
     }
    async updateTeapot(req,res){
        const {id, title , volume, power, material} = req.body
        console.log(req.body)
        const user = await db.query(`update teapot set title = '${title}', volume = ${volume}, power = ${power}, material = '${material}' where id = ${id}`)
     }

     async report(req,res){
        const from = req.params.from
        const to = req.params.to
        const users = await db.query(`select * from teapot where date between '${from}' and '${to}'`)
        
        res.json(users.rows)
    }
    
}
 

