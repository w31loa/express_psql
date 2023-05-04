import pkg from 'pg';
const { Pool } = pkg;



const pool = new Pool({
    user: '))))',
    password: 'root',
    host: 'localhost',
    port:5432,
    database: 'ZaVod'
})


export default pool


