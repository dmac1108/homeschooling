const LessonsService = {
    getAllLessons(knex){
        return knex.select('*').from('lessons');
    },
    insertLesson(knex, newLesson){
        return knex
        .insert(newLesson)
        .into('lessons')
        .returning('*')
        .then(rows =>{
            
            return rows[0]
            
        })
    },
    
}
module.exports = LessonsService