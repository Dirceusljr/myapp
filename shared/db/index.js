import mysql from 'mysql';


var db = mysql.createConnection({
    host     : 'database',
    user     : 'myapp',
    password : 'myapp',
    database: 'myapp'
  });

  export { db };