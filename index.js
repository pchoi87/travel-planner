const inquirer = require('inquirer');
const {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
} = require('./queries');

const viewDepartments = async () => {
    try {
        const res = await getAllDepartments();
        console.table(res.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const viewRoles = async () => {
    try {
        const res = await getAllRoles();
        console.table(res.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const viewEmployees = async () => {
    try {
        const res = await getAllEmployees();
        console.table(res.rows);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const addNewDepartment = async () => {
    const answer = await inquirer.prompt({
        name: 'name',
        type: 'input',
        message: 'Enter the name of the department:'
    });
    try {
        await addDepartment(answer.name);
        console.log(`Added department: ${answer.name}`);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const addNewRole = async () => {
    const answers = await inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the role:'
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter the salary for the role:'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'Enter the department ID for the role:'
        }
    ]);
    try {
        await addRole(answers.title, answers.salary, answers.department_id);
        console.log(`Added role: ${answers.title}`);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const addNewEmployee = async () => {
    const answers = await inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the first name of the employee:'
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the last name of the employee:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the role ID for the employee:'
        },
        {
            name: 'manager_id',
            type: 'input',
            message: 'Enter the manager ID for the employee (leave blank if none):',
            default: null
        }
    ]);
    try {
        await addEmployee(answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
        console.log(`Added employee: ${answers.first_name} ${answers.last_name}`);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const updateRole = async () => {
    const answers = await inquirer.prompt([
        {
            name: 'employee_id',
            type: 'input',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'Enter the new role ID for the employee:'
        }
    ]);
    try {
        await updateEmployeeRole(answers.employee_id, answers.role_id);
        console.log(`Updated employee's role`);
    } catch (err) {
        console.error('Error executing query', err.stack);
    }
};

const mainPrompt = async () => {
    const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
    });

    switch (answer.action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addNewDepartment();
            break;
        case 'Add a role':
            await addNewRole();
            break;
        case 'Add an employee':
            await addNewEmployee();
            break;
        case 'Update an employee role':
            await updateRole();
            break;
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    mainPrompt();
};

mainPrompt();
