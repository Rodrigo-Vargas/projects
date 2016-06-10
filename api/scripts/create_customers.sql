\connect projects
DROP TABLE customers;

CREATE TABLE customers (
  id serial PRIMARY KEY,
  user_id int,
  name varchar(100)
)