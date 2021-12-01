const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path")
const bodyParser = require("body-parser")

const Handlebars = require("express-handlebars")

app.use(express.static(path.join(__dirname, 'public')))
//motor de render
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

//parse body 
app.use(bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf
    }
  }))
app.use(express.urlencoded({ extended: false }));



//pages
const index   = require("./routes/home")
const cliente = require("./routes/client")
const admin   = require("./routes/admin")
const tienda  = require("./routes/tienda")
const pagos	  = require("./routes/pagos")
const webhook = require("./routes/webhook")


//conectores de rutas
app.use("/", index)
app.use("/cliente", cliente)
app.use("/admin", admin)
app.use("/tienda", tienda)
app.use("/pagos", pagos)
app.use("/webhook", webhook)
//app.use("/webwook", webhook) //cuando escribi mal XD


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
