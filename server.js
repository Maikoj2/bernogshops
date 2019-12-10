const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const { config }= require("./config/index");
const productapi =require("./routes/products");
const user =require("./routes/user");
const authApi = require('./routes/auth');




const { logErrors, wrapErrors, errorHandler  } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
const cors = require('cors');





//configuracione
app.set('port',process.env.PORT || 3000);

app.use(cors());

//body-parser
app.use(morgan('dev'));
app.use(express.json());
app.use(helmet());

productapi(app);
user(app);
//authApi(app);



// Catch 404
app.use(notFoundHandler);
// Los middlewares de error, siempre tienen que ir al final de las rutas, 
// las rutas también son middlewares
// **Menejadores de errores**
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

//routes
app.get('/', (req, res) => {
    res.send("Hello world");
  })
  
  app.get('/json', (req, res) => {
    res.json({hello: 'world'});
  })




app.listen(app.get('port'), function (){
    console.log(`nescuchado puerto ${app.get('port')}`);
});





