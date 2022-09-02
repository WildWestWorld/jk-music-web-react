const path = require("path")

const resolove= dir =>path.resolve(__dirname,dir);



module.exports={
    webpack:{
        alias:{
            "@":resolove("src"),
            "component":resolove("src/components")
         }
    }
}