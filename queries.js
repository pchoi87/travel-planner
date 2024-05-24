const client = require('./db');

const getAllDepartments = async () => {
    return client.query('SELECT * FROM departments');
};

const getAllRoles = async () => {
    return client.query('SELECT * FROM roles');
};

const getAllEmployees = async () => {
    return client.query('SELECT * FROM employees');
};

const addDepartment = async (name) => {
    return client.query('INSERT INTO departments (name) VALUES ($1)', [name]);
};

const addRole = async (title, salary, department_id) => {
    return client.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = async (first_name, last_name, role_id, manager_id) => {
    return client.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = async (employee_id, role_id) => {
    return client.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
