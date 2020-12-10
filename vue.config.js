// vue.config.js file to be place in the root of your repository
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? (process.argv.indexOf("--work-local") > -1 ?
        "./" :
        "/algoritmo-genetico/") : "/",

};