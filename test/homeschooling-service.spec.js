require('dotenv').config()
const { expect } = require("chai")
const HomeschoolingService = require('../src/HomeschoolingService')
const knex = require('knex')

describe(`Homeschooling service object`, function(){
    let db

    before(()=>{
        db=knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
    })
    
    
    describe(`getAllLessons()`,()=>{
        it(`resolves all lessons from 'lessons' table`, ()=>{
            //test
        })
    })

})