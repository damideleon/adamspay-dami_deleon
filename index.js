const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path")

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

//pages
const index   = require("./routes/home")
const cliente = require("./routes/client")
const admin   = require("./routes/admin")
const tienda  = require("./routes/tienda")
const pagos	  = require("./routes/pagos")


//conectores de rutas
app.use("/", index)
app.use("/cliente", cliente)
app.use("/admin", admin)
app.use("/tienda", tienda)
app.use("/pagos", pagos)


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
