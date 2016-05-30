\connect projects
DROP TABLE users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email varchar(100),
  password varchar(100)
);