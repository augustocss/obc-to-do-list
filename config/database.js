const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb+srv://augustocss:Acesso7@apicluster.xs72l.mongodb.net/todo-list?retryWrites=true&w=majority`)
    .then(() => {
        console.log("\n.\n.\n.\nConectado ao MongoDB!!")
    })
    .catch((err) => console.log(err));