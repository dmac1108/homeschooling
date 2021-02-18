require('dotenv').config()
const { expect } = require("chai")
const LessonsService = require('../src/lessons-service.js')
const knex = require('knex')
const { getAllLessons } = require('../src/lessons-service.js')

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
    
    before('restart the student identity and truncate',() => db.raw('TRUNCATE students RESTART IDENTITY CASCADE'))
    
    before(()=>{
        return db
        .into('students')
        .insert(testStudent)
        
    })
    afterEach(()=> db('lessons').truncate())
    //afterEach('restart the student identity and truncate',() => db.raw('TRUNCATE students RESTART IDENTITY CASCADE'))


    context(`Given 'lessons' has data`, ()=>{

        /*before(()=>{
            return db
            .into('students')
            .insert(testStudent)
            
        })*/
    
        before(()=>{
            return db
            .into('lessons')
            .insert(testLessons)
        })

        it(`getAllLessons() resolves all lessons from 'lessons' table`, ()=>{
            return LessonsService.getAllLessons(db)
            .then(actual => {
                
                expect(actual).to.eql(testLessons);
            })
        })
    })

    
    context(`Given 'lessons' has no data`, ()=>{
        
        it(`getAllLessons() returns an empty array`, ()=>{
            return LessonsService.getAllLessons(db)
            .then(actual => {
                expect(actual).to.eql([])
            })
        })

        it(`insertLesson'() inserts a new lesson and resolves the new lesson with an 'id'`, ()=>{

            const newLesson = {
                date_completed: new Date('2020-12-13T16:28:32.615Z'),
                school_subject: 'Math',
                topic: 'Fractions',
                lesson_type: 'In-Person Instruction',
                reference: 'Teachers Pay Teachers',
                student_id: 1
            }

            return LessonsService.insertLesson(db, newLesson)
            .then(actual =>{
                expect(actual.lesson_id).to.eql(1)
                expect(actual.date_completed).to.eql(new Date(newLesson.date_completed))
                expect(actual.school_subject).to.eql(newLesson.school_subject)
                expect(actual.topic).to.eql(newLesson.topic)
                expect(actual.lesson_type).to.eql(newLesson.lesson_type)
                expect(actual.reference).to.eql(newLesson.reference)
                expect(actual.student_id).to.eql(newLesson.student_id)
                
            })
        } )

    })

})