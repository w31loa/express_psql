import db from '../db.js'


export default class DetailController{
    async createDetail(req,res){
        const {title,teapot, workshop} = req.body
        const newWorkshop  = await db.query(`INSERT INTO detail (title,teapot_id,workshop_id) values ('${title}',${teapot}, ${workshop}) RETURNING *`)
         res.json(newWorkshop.rows[0])
    }
    async getAll(req,res){
        const detail = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id`)
        res.json(detail.rows    )

    }
    async deleteDetail(req,res){
        const id = req.params.id
        const user = await db.query(`delete from detail where id = $1`, [id])
    }
    async sortDetailById(req,res){
        const by = req.params.by
        const order = req.params.order
        if(by == 'title'|| by== 'id'){
            const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id order by detail.${by} ${order}`)
            res.json(users.rows)
        }else if(by=='workshop'){
            const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id order by workshop.title ${order}`)
            res.json(users.rows)
        }else if(by=='teapot'){
            const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id order by teapot.title ${order}`)
            res.json(users.rows)
        }
      
     }
    async selectDetail(req,res){
        const by = req.params.by
        const value = req.params.value
        // const users = await db.query(`select * from detail where ${by}=${value} `)
        if(by != 'detail.id'){
            const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id and ${by}='${value}' `)
            res.json(users.rows)
        }else{
            const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id and ${by}=${value} `)
            res.json(users.rows)
        }
     
     }
    async searchDetail(req,res){
        const by = req.params.by
        const value = req.params.value
        // const users = await db.query(`select * from detail where ${by}::TEXT like '%${value}%'`)
        const users = await db.query(`select detail.id, detail.title , teapot.title as teapot, workshop.title as workshop from detail, teapot, workshop WHERE detail.teapot_id = teapot.id AND detail.workshop_id = workshop.id and  ${by}::TEXT like '%${value}%' `)

        res.json(users.rows)
     }
    async updateDetail(req,res){
        const {id, title,teapot, workshop} = req.body
        console.log(req.body)
        const user = await db.query(`update detail set title = '${title}', teapot_id = ${teapot} , workshop_id=${workshop} where id = ${id}`)
     }
}
 

