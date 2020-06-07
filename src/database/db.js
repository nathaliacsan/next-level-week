// importar a dependencia do sqlite3
// verbose é uma função dentro de um objeto(metodo) >
// Verbose fala que queremos ver msg no terminal >
// retorna pro sqlite3 um objeto
const sqlite3 = require("sqlite3").verbose()

// criar objeto que irá fazer operação no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// exportar o objeto db
module.exports = db
// utilizar o objeto de banco de dados, para nossas operações
db.serialize(() => {
//     // com comandos sql eu vou:

//     // 1 criar uma tabela
//     db.run (`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // 2 inserior dados na tabela places
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [ // isso é um array
//         "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
//         "Paperside",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData (erro){
//         if(erro) {
//             return console.log(erro)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this) // referenciando a resposta do run
//     }

//     // quando voltar a resposta do query e values, executa a função
//     db.run(query, values, afterInsertData)

//     // 3 consultar os dados da tabela
//     // db all é para selecionar tudo
//     // selecionar TUDO de places = SELECT * FROM places
//     // rows são os registros da tabela, virá no formato de array
//     db.all(`SELECT name FROM places`, function(erro, rows){ 
//         if(erro) {
//             return console.log(erro)
//         }
//         console.log("Aqui estão os seus registros")
//         console.log(rows)
//     })


//     // 4 deletar um dado da tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [4], function(erro){
    //     if(erro) {
    //         return console.log(erro)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })
})

