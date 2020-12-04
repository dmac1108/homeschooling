require('dotenv').config()
const { expect } = require("chai")
const LessonsService = require('../src/lessons-service.js')
const knex = require('knex')

describe(`Lessons service object`, function(){
    let db
    
    let testStudent = [{
        student_id: 1,
        firstname: 'Wade',
        lastname: 'McNeil'

    }];
    
    let testLessons = [{
        date_completed: '2020-11-23',
        school_subject: 'Math',
        topic: 'Rounding Decimals',
        lesson_type: 'In-Person Instruction',
        reference: 'Teachers Pay Teachers',
        student_id: 1
    },
    {
        date_completed: '2020-11-23',
        school_subject: 'Science',
        topic: 'Weathering',
        lesson_type: 'In-Person Instruction',
        reference: 'Teachers Pay Teachers',
        student_id: 1
    }
];



    before(()=>{
        db=knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    

    
    after('disconnect from db', () => db.destroy())

    before('clean the lessons table', () =>db('lessons').truncate())
    before('clean the students table', ()=>db('students').truncate())
    before('reset the serial number sequence', ()=>db('students').raw('select setval(pg_get_serial_sequence("students", "student_id"), COALESCE((SELECT MAX(student_id) +1 FROM students),1,false)'))
    
    before(()=>{
        return db
        .into('students')
        .insert(testStudent)
        
    })

    before(()=>{
        return db
        .into('lessons')
        .insert(testLessons)
    })


    describe(`getAllLessons()`,()=>{
        it(`resolves all lessons from 'lessons' table`, ()=>{
            return LessonsService.getAllLessons()
            .then(actual => {
                expect(actual).to.eql(testLessons);
            })
        })
    })

})