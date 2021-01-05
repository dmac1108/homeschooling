const LessonsService = {
    getAllLessons(knex){
        return knex.select('*').from('lessons');
    }
}
module.exports = LessonsService