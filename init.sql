CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id uuid DEFAULT uuid_generate_v4 (),
    email text,
    password text,
    PRIMARY KEY (id)
);

CREATE TABLE tasks
(
    id SERIAL not null,
    title text,
    content text,
    list text,
    PRIMARY KEY (id)
);