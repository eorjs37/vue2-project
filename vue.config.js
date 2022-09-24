const path = require("path");
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.join(__dirname, "src/"),
                api: path.join(__dirname, "src/api/"),
            },
        },
    },
};
