const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://admin:admin@hzumaeta-atlas-db.klnk0.mongodb.net?retryWrites=true&w=majority';
const uri = 'mongodb://localhost:27017';


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// let db = client.db('hzumaeta-atlas-db');
let db = client.db('msa-students');

client.connect((err) => {
    console.error("voy a conectarme man");
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }

  // db = client.db('hzumaeta-atlas-db');
  console.log('Conexión exitosa a la base de datos');
});

// Configurar rutas aquí

app.get('/datos', (req, res) => {
    
    const collection = db.collection('strapi_permission');
    collection.find({}).toArray((err, result) => {
      if (err) {
        console.error('Error al obtener datos de la colección:', err);
        res.status(500).send('Error en el servidor');
        return;
      }
      console.log("################..........###", result);
      res.json(result);
    });
  });
  

  app.get("/students", (req, res) => {

    console.log("............");
    trips = db.collection("students")
    trips.find().toArray((err, items) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
    res.status(200).json({ trips: items })
    })
  })  
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
