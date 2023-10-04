const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/cadastro", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
});

const db = mongoose.connection;

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("/salvar-usuario", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Usuário cadastrado com sucesso!");
          form.reset();
        } else {
          alert("Ocorreu um erro ao cadastrar o usuário.");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
});



// Definir o modelo do usuário
const Usuario = mongoose.model("Usuario", {
  nome: String,
   email: String,
  celular: String,
  endereco: String,
  complemento: String,
  numero: String,
  bairro: String,
  cidade: String,
  uf: String,
  cep: String,
});

app.use(bodyParser.urlencoded({ extended: true }));

// Rota para salvar o usuário
app.post("/salvar-usuario", (req, res) => {
  const usuarioData = req.body;

  const usuario = new Usuario(usuarioData);

  usuario
    .save()
    .then(() => {
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Erro ao salvar usuário:", error);
      res.json({ success: false });
    });
});

app.listen(3000, () => {
  console.log("Servidor está ouvindo na porta 3000");
});
