const express = require("express");
const app = express();
const usersRouter = require("./users");
const path = require("path");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

app.use(express.json());
app.use("/users", usersRouter);
app.get("/favicon.ico", (req, res) => {
    const filepath = path.join(__dirname, "../img/favicon.ico");

    res.sendFile(filepath);
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = app;
