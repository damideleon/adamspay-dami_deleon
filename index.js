const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

//pages
const index   = require("./routes/home")
const cliente = require("./routes/client")
const admin   = require("./routes/admin")
const tienda  = require("./routes/tienda")


//conectores de rutas
app.use("/", index)
app.use("/cliente", cliente)
app.use("/admin", admin)
app.use("/tienda", tienda)


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
