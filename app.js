const express = require('express');
const path = require('path');

const checklistRouter =  require('./src/routes/checklist');
const rootRouter =  require('./src/routes/index');

require('./config/database')


const app = express();

app.use(express.json());  // verifique se existe JSON na req, processa e coloca no body

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checklistRouter);


/*
const log = (req, res, next) => {
    console.log(req.body)
    console.log("Data: " + Date.now())
    next();
}

app.use(log)

app.get('/', (req, res) => {
    res.send('<h1>Minha lista de tarefas</h1>')
})

app.get('/json', (req, res) => {
    res.json({ title: "Tarefa 1", done: true })
})
*/

app.listen(3000, () => {
    console.log('Servidor foi iniciado')
})