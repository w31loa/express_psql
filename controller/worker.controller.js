import db from '../db.js'


export default class WorkerController{
    async createWorker(req,res){
        const {surname,firstname, patronymic, position_id, workshop_id} = req.body
        const newWorkshop  = await db.query(`INSERT INTO worker (surname,firstname,patronymic, position_id, workshop_id) values ('${surname}','${firstname}', '${patronymic}', ${position_id}, ${workshop_id}) RETURNING *`)
         res.json(newWorkshop.rows[0])
    }
    async getAll(req,res){
        const detail = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id`)
        res.json(detail.rows    )

    }
    async deleteWorker(req,res){
        const id = req.params.id
        const user = await db.query(`delete from worker where id = $1`, [id])
    }
    async sortWorkerById(req,res){
        const by = req.params.by
        const order = req.params.order
        if(by == 'firstname'|| by== 'id'|| by == 'surname' || by == 'patronymic'){
            const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by worker.${by} ${order}`)
            res.json(users.rows)
        }else if(by=='position_name'){
            const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by position.position_name ${order}`)
            res.json(users.rows)
        }else if(by=='workshop'){
            const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by workshop.title ${order}`)
            res.json(users.rows)
        }
      
     }
    async selectWorker(req,res){
        const by = req.params.by
        const value = req.params.value
        // const users = await db.query(`select * from detail where ${by}=${value} `)
        if(by != 'worker.id'){
            const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id and ${by}='${value}' `)
            res.json(users.rows)
        }else{
            const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id and ${by}=${value} `)
            res.json(users.rows)
        }
        
     
     }
    async searchWorker(req,res){
        const by = req.params.by
        const value = req.params.value
        // const users = await db.query(`select * from detail where ${by}::TEXT like '%${value}%'`)
        const users = await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id and  ${by}::TEXT like '%${value}%' `)

        res.json(users.rows)
     }
    async updateWorker(req,res){
        const {id,surname,firstname, patronymic, position_id, workshop_id} = req.body
        const user = await db.query(`update worker set surname = '${surname}',firstname = '${firstname}',patronymic = '${patronymic}', position_id = ${position_id} , workshop_id=${workshop_id} where id = ${id}`)
     }
}
 

