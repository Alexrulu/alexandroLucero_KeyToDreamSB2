require('dotenv').config();

module.exports ={
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "keytodreamDB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
