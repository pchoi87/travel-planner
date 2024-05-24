CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO departments (name) VALUES ('Engineering');
INSERT INTO departments (name) VALUES ('Human Resources');
INSERT INTO departments (name) VALUES ('Finance');

INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 75000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Finance Analyst', 70000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Mike', 'Johnson', 3, NULL);
