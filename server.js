const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./database.db');
const express = require ('express');
const app = express ();

//CORS
const appcors = require ('cors');
app.use(appcors);
app.options('*', appcors())

//Olá Mundo
app.get ('/', (req, resp) => {
    resp.send ('Hello World!')
    
});


//GET
app.get ('/tarefas2', (req, resp) => {
    resp.send ('Utilizando GET nessa rota!')
    
});


//READ 
app.get ('/tarefas3', (req, resp) => {
    db.all ('SELECT * FROM TAREFAS', (err, rows) => {
        resp.send (JSON.stringify({status:"Ok", results: rows}))
    })
    
});

//CREATE
const bodyParser = require ('body-parser')

app.use (bodyParser.json());

app.post ('/tarefasPost', (req, resp) => {
    db.run(`INSERT INTO TAREFAS (titulo, descricao, status)
    VALUES (?, ?, ?)`, [req.body.titulo, req.body.desc, req.body.status]);

    console.log(req.body);

    resp.status(200).send ('Valores inseridos!')
});

//DELETE
app.delete ('/tarefasDel/:id', (req, resp) => {
    db.run(`DELETE FROM TAREFAS WHERE id LIKE ?`, [req.params.id])
    resp.status(200).send ('Valores deletados!')

});

//UPDATE

app.put ('/tarefasUp/:id', (req, resp) => {
    
    db.run(`UPDATE TAREFAS SET titulo = ? WHERE id = ?`, [req.body.titulo, req.params.id])
    resp.status(200).send ('Valores atualizados!')

});

///////////////////////////////////////////////////////////////////////////////////////

//GET ESPECIFICA
app.get ('/tarefas/:id', (req, resp) => {
    db.get ('SELECT * FROM TAREFAS WHERE id=?', [req.params.id], (err, rows) => {
        resp.send (JSON.stringify({status:"Ok", result: rows}))
    })
    
});



app.listen (3000, () => console.log('Running...'));

process.on('SIGINT', ()=> {
    db.close((err) => {
        console.log("Banco encerrado com sucesso!");
        process.exit(0);
    })
})