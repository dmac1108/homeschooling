CREATE TYPE subject AS ENUM('Art', 'Health', 'Language Arts', 'Math', 'Music', 'Physical Education', 'Science');
CREATE TYPE type AS ENUM ('In-Person Instruction', 'Field Trip', 'Project', 'Quiz', 'Test', 'Video Instruction', 'Worksheet');

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    firstname VARCHAR(250) NOT NULL,
    lastname VARCHAR(250) NOT NULL 
);

CREATE TABLE lessons (
    lesson_id SERIAL PRIMARY KEY,
    date_completed TIMESTAMPTZ DEFAULT now() NOT NULL,
    school_subject subject,
    topic varchar(250) NOT NULL,
    lesson_type type,
    reference varchar(250),
    student_id INTEGER REFERENCES students (student_id) ON DELETE CASCADE
);