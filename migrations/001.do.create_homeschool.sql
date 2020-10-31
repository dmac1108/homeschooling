CREATE TYPE subject AS ENUM('Art', 'Health', 'Language Arts', 'Math', 'Music', 'Physical Education', 'Science');
CREATE TYPE type AS ('In-Person Instruction', 'Field Trip', 'Project', 'Quiz', 'Test', 'Video Instruction', 'Worksheet');

CREATE TABLE lesson (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS ID ENTITY,
    date_completed TIMESTAMPTZ DEFAULT now() NOT NULL,
    school_subject subject,
    topic text NOT NULL,
    lesson_type type,
    reference text
)