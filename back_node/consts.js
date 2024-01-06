import mariadb from 'mysql'

const conn = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345',
    database: 'week12'
})

export default conn;