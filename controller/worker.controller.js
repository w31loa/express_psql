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
            await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by worker.${by} ${order}`, (err,resp)=>{
                if(err){
                    console.log(err.message)
                }else{
                    res.json(resp.rows)

                }
            })
            
        }else if(by=='position_name'){
            await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by position.position_name ${order}`, (err,resp)=>{
                if(err){
                    console.log(err.message)
                }else{
                    res.json(resp.rows)

                }
            })
            
        }else if(by=='workshop'){
            await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id order by workshop.title ${order}`, (err,resp)=>{
                if(err){
                    console.log(err.message)
                }else{
                    res.json(resp.rows)

                }
            })
            
        }
      
     }
    async selectWorker(req,res){
        const by = req.params.by
        const value = req.params.value
        // const users = await db.query(`select * from detail where ${by}=${value} `)
        if(by != 'worker.id'){
            db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id and ${by}='${value}' `, (err,resp)=>{
                if(err){
                    console.log(err.message)
                }else{
                   res.json(resp.rows)
                    
                }
            })
        }else{
            await db.query(`select worker.id, worker.surname, worker.firstname , worker.patronymic, position.position_name, workshop.title as workshop from worker, position, workshop WHERE worker.position_id = position.id AND worker.workshop_id = workshop.id and ${by}=${value} `, (err,resp)=>{
                if(err){
                    console.log(err.message)
                }else{
                    res.json(resp.rows)

                }
            })
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
 

