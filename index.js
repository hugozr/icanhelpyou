// ...
const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

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

app.get("/clients", async (req, res) => {
  students = await db.collection("clients");
  const found = await students.find().toArray();
  res.json(found);
});

app.get("/clients/:code", async (req, res) => {
  students = await db.collection("clients");
  academics = await db.collection("academics");
  const code = req.params.code;
  let foundStudent = await students.findOne({code });
  const foundAcademics = await academics.find({clientCode: code }).toArray();
  foundStudent.academics = foundAcademics
  res.json(foundStudent);
});

startServer();
