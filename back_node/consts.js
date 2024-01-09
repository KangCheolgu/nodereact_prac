import mariadb from 'mysql'

const conn = mariadb.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'kangcg',
    password: 'showgan08!',
    database: 'node_react_board'
})

export default conn;