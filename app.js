const express = require('express');
const mysql   = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host     : '18.221.78.93',
  user     : 'root',
  password : 'password',
  database : 'student'
}); 

/*
+------------+-------------+------+-----+---------+-------+
| Field      | Type        | Null | Key | Default | Extra |
+------------+-------------+------+-----+---------+-------+
| id         | int         | NO   |     | NULL    |       |
| name       | varchar(12) | NO   |     | NULL    |       |
| height     | int         | NO   |     | NULL    |       |
| birth      | date        | YES  |     | NULL    |       |
| self_intro | text        | YES  |     | NULL    |       |
+------------+-------------+------+-----+---------+-------+


## CRUD 기능

- 조회
    - 모든 학생 index 순서대로 조회하는 기능
    - 월과 일을 따로 입력받도록 하여, 일치하는 생일을 가진 학생만 조회하는 기능
    - 키가 큰 학생부터 정렬하여 모두 조회하는 기능
- 추가
    - 학생 데이터를 추가하는 기능 // O
    - NULL인 데이터는 입력하지 않아도 오류가 나지 않도록 // how
- 삭제
    - 학생 이름으로 검색해, 해당하는 학생 데이터를 삭제 // O
- (수정)
    - 원하는 사람만 구현

*/

connection.connect();

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html');

    connection.query('SELECT * from person', (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
      });

});

app.listen(port, () => {
    console.log('server is running');
  });

// CREATE 
app.use(express.urlencoded({extended: true}));

app.post('/create', (req, res)=>{

    const name = req.body.student_name;
    const id = req.body.student_id;
    const height = req.body.student_height;
    var bday= req.body.student_bday;
    var self_intro = req.body.student_intro;

    if(bday==undefined) bday="NULL";
    if(self_intro==undefined) self_intro == "NULL";

    connection.query(`INSERT INTO person (id, name, height, birth, self_intro) VALUES(${id}, '${name}', ${height}, '${bday}', '${self_intro}');`, (error, rows, fields) => {
        if (error) throw error;
        console.log('User info is: ', rows);
      });

      res.send("입력 ㅇㅋ");

// console.log(req.body);
});

// DELETE

app.get('/deletemain',(req, res)=>{
    res.sendFile(__dirname + '/delete.html');
})

app.post('/delete', (req, res)=>{

    const name = req.body.name_todelete;
    let msg = "";

    if(name==undefined) throw "value required";

    connection.query(`DELETE FROM person WHERE name="${name}";`, (error, rows, fields) => {
        if (error) {
            msg = "삭제 실패";
        }
        else msg = "삭제 성공";
        console.log('User info is: ', rows);
      });
res.send(msg);
// console.log(req.body);
});