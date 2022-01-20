const express = require ('express')
const { Article } = require("./api")

const app = express(); 

app.use(express.json()); 
app.use(express.urlencoded({ extends : true })); 

app.get("/", (req, res) =>  {
    res.send("Success"); 
})

app.post("/create", Article.articleCreate); 

const PORT = 3000; 
app.listen(3000, "localhost", () => { 
    console.log('app listening at' ,  `http://localhost:${PORT}`)
})

//req.body - post에서 들어온 페이로드를 받을 수 있다.
