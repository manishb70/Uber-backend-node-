const app = require("./app.js")
const http = require("http")
const port = process.env.PORT || 4000;





const server = http.createServer(app)

server.listen(port,()=>{
    console.log(`The server is on port ${port}`);
})