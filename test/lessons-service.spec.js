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
        lesson_id: 1,
        date_completed: new Date('2020-11-23T16:28:32.615Z'),
        school_subject: 'Math',
        topic: 'Rounding Decimals',
        lesson_type: 'In-Person Instruction',
        reference: 'Teachers Pay Teachers',
        student_id: 1
    },
    {
        lesson_id: 2,
        date_completed: new Date('2020-11-23T16:28:32.615Z'),
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
    //before('clean the students table', ()=>db('students').truncate())
    before('restart the student identity and truncate',() => db.raw('TRUNCATE students RESTART IDENTITY CASCADE'))
    
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
            return LessonsService.getAllLessons(db)
            .then(actual => {
                
                expect(actual).to.eql(testLessons);
            })
        })
    })

})