// ...
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoClient } = require("mongodb");

const port = 3000;
let students;

// const uri = "mongodb://localhost:27017";
const uri = "mongodb+srv://admin:admin@hzumaeta-atlas-db.klnk0.mongodb.net/"
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const startServer = async () => {
  try {
    await client.connect();
    // db = client.db("msa-students");
    db = client.db("icanhelpyou");
    console.log("Conexión exitosa a la base de datos");
    app.listen(port, () => {
      console.log(`Servidor Express escuchando en el puerto ${port}`);
    });
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
};

app.get("/datos", async (req, res) => {
  // students = await db.collection("students");
  students = await db.collection("clients");
  const found = await students.find().toArray();
  res.json(found);
});

startServer();
