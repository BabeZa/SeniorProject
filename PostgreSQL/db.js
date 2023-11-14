const Pool = require("pg").Pool;

const pool = new Pool({
    host: "167.99.70.72",
    // host: "localhost",
    port: 5432,
    user: "postgres",
    password: "B407b407",
    database: "DBv6"
});


module.exports = pool;