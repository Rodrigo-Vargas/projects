\connect projects
DROP TABLE tasks;

CREATE TABLE tasks (
  id serial PRIMARY KEY,
  customer_id int,
  description varchar(100),
  start varchar(10),
  conclusion varchar(10)
)