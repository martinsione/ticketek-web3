const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync().then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`port listening at ${process.env.PORT}`); // eslint-disable-line no-console
        //   console.log("tables forced"); // eslint-disable-line no-console
    });
});
