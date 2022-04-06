const axios = require("axios");
const { User } = require("../db");

module.exports = {
    getUrl: async function (url) {
        try {
            const data = await axios.get(url);
            return { data, error: false };
        } catch (error) {
            return { data: false, error };
        }
    },
    promisifyGetData: function (data) {
        return data.data.results.map((poke) => {
            return new Promise(function (resolve, reject) {
                axios
                    .get(poke.url)
                    .then((response) => resolve(response))
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    },
    promisifySaveType: function (values) {
        return values.map((value) => {
            return new Promise(function (resolve, reject) {
                Type.findOrCreate({
                    where: { id: value.data.id },
                    defaults: {
                        name: value.data.name,
                        id: value.data.id,
                    },
                })
                    .then((response) => resolve(response))
                    .catch(function (error) {
                        reject(error);
                    });
            });
        });
    },
    createUser: async function (params) {
        const { walletAddress, name, location } = params;
        const user = await User.create({
            name: name.toLowerCase(),
            walletAddress,
            location,
        });

        return user;
    },
};
