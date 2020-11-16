require('dotenv').config()
const knex = require('knex')
const LessonsService = require('./lessons-service')
const LessonService = require('./lessons-service')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
})

console.log(LessonsService.getAllLessons())