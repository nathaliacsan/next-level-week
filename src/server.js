
const express = require("express")
const server = express()

//pegar o banco de dados
// o module.exports está enviando pra cá
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))
// habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server, // nosso servidor é o express
    noCache: true 
// pra nao devolver aplicações velhas guardadas em cache, sujeiras
})



// configurar caminhos na minha aplicação
// página inicial
// req: requisição - pedido
// res: resposta

//chamar rotas >
server.get("/", (req, res) => {
    return res.render("index.html")
    //render é passar pelo motor do nunjucks o index html
})


server.get("/create-point", (req, res) => {

    // req.query: query strings(?, nome, &) da url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body: o corpo do nosso formulario

    // inserir dados no banco de dados
        const query = `
        INSERT INT places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [ // isso é um array
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData (erro){
        if(erro) {
            console.log(erro)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this) // referenciando a resposta do run
        
        return res.render("create-point.html", {saved: true})
    }

    // quando voltar a resposta do query e values, executa a função
    db.run(query, values, afterInsertData)

} )

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    // pegar os dados do banco de dados
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(erro, rows){ 
        if(erro) {
            return console.log(erro)
        }
      const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    })

    
})



// ligar o servidor
server.listen(3000)