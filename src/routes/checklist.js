const { Router } = require('express')
const express = require('express')

const router = express.Router()

const Checklist = require('../models/checklist')

const Task = require('../models/task')

router.get('/', async (req, res) => {
    try {
        let checklists = await Checklist.find({})
        res.status(200).render('checklists/index', { checklists: checklists })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao exibir as listas' })
    }
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao carregar form' })
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit', { checklist: checklist })
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro editar tarefas' })
    }
})


router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    try {
        let checklist = await Checklist.create({ name })
        res.redirect('/checklists')
    } catch (error) {
        res.status(422).render('checklists/new', { checklists: { ...checklist, error } })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id).populate('tasks')
        res.status(200).render('checklists/show', { checklist: checklist })
        console.log('nova tarefa')
    } catch (error) {
        res.status(422).render('pages/error', { error: 'Erro ao exibir as listas de tarefas' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        let { name } = req.body.checklist
        let checklist = await Checklist.findById(req.params.id);

        await checklist.update({ name })
        res.redirect('/checklists')
    } catch (error) {
        let errors = error.errors
        res.status(422).render('checklists/edit', { checklist: { ...checklist, errors } })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklists')
    } catch (error) {
        res.status(500).render('pages/error', { error: 'Erro ao deletar tarefas' })
    }
})

module.exports = router