const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//motor de plantillas
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs');

//servir archivos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')))

//middlewares para lectura de peticiones
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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


//inicializar server
app.listen(port, () => console.log(`Listening on ${ port }`))



/*
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/
