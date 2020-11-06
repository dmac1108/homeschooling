# Homeschool

This app is used to track homeschooling activities for the purpose of demonstrating continuous instruction. It consists of a postgres homeschool database with a node express service to maintain the database and interface with the web application. 

## Set up


## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is read for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Seeding

Run the following script to seed the database:
psql -U rolename -d homeschool -f ./seeds/seed.homeschool.lessons.sql 