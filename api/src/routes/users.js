const express = require("express");
const router = express.Router();
const axios = require("axios");
const { User } = require("../db");
const path = require("path");
const { getUrl, promisifyGetData, createUser } = require("./utils");

router.get("/", async (req, res) => {
    // Recupero el nombre pasado por parámetros en la URL
    const { name } = req.query;
    //     Si hay nombre, obtengo el usuario con ese nombre
    if (name) {
        const user = await User.findOne({
            where: {
                name: name,
            },
        });
        //   Si lo encuentra, devuelvo el usuario
        if (user) {
            return res.json(user);
        } else {
            //   Caso contrario, devuelvo un error
            return res.status(404).send({
                error: "failed to get the user with the specified name",
            });
        }
    } else {
        //     Si no hay nombre en los parámetros, entonces traigo todos los usuarios
        var users = await User.findAll();

        // Hago console log para ver el formato en el que los devuelve
        if (users.length) {
            users.forEach((user) => {
                console.log(user);
            });
            // Devuelvo los usuarios
            return res.json(users);
        } else {
            //   Si no hay usuarios, devuelvo error
            return res.status(404).send({
                error: "there are no users in the database",
            });
        }
    }
});

router.get("/:walletAddress", async (req, res) => {
    const { walletAddress } = req.params;

    try {
        const user = await User.findOne({
            where: { walletAddress },
        });
        if (user) res.json(user);
        else
            return res.status(404).send({
                error: "user with the specified wallet address doesn't exist",
            });
    } catch (error) {
        return res.send({ error });
    }
});

function areCorrectParams(params) {
    const { walletAddress, name, location } = params;
    if (
        !name ||
        typeof name !== "string" ||
        !walletAddress ||
        typeof walletAddress !== "string" ||
        !location ||
        typeof location !== "string"
    ) {
        return false;
    }
    return true;
}

router.post("/", async (req, res) => {
    if (areCorrectParams(req.body)) {
        const existing = await User.findOne({
            where: { walletAddress: req.body.walletAddress },
        });
        if (existing) {
            return res.status(400).send({
                error: "wallet address already registered",
            });
        } else {
            const user = await createUser(req.body);
            return res.send(user);
        }
    } else {
        return res.status(400).send({
            error: "missing or wrong params",
        });
    }
});

// router.put("/:id", async (req, res) => {
//     const { id } = req.params;
//     const input = req.body;

//     const pokemon = await Pokemon.findByPk(id, { include: Type });

//     await pokemon.update({
//         name: input.name,
//         attack: input.attack,
//         defense: input.defense,
//         hp: input.hp,
//         speed: input.speed,
//     });

//     pokemon.save();
//     return res.send(pokemon.dataValues);
// });

router.delete("/:walletAddress", async (req, res) => {
    const { walletAddress } = req.params;
    try {
        const userForDelete = await User.findOne({ where: { walletAddress } });
        await userForDelete.destroy();
    } catch (error) {
        return res.status(404).send({
            error: "failed to delete the specified user",
        });
    }
    return res.sendStatus(200);
});

router.get("/image/default-user", (req, res) => {
    var filepath = path.join(__dirname, "../img/default_user.jpg");
    res.sendFile(filepath);
});

module.exports = router;
