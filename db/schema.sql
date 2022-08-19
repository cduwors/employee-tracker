DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id INTEGER NOT NULL PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER

);

CREATE TABLE employee (
    id INTEGER NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER
);

