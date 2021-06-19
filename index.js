// dependaces 
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    // Port
    host:3001,
    // database username
    user: 'root',
    // database password
    password: '',
    // database name
    database: 'TrackerDB',
});


connection.connect((err) => {
    if (err) throw err;
    console.log('**********************************************************************');
    console.log('                   Employee Tracker 2000                              ');
    console.log('**********************************************************************');
    startDoc();
  }); 

const startDoc =() =>{ 
    inquirer.prompt({

        type:'list',
        name:'first_question',
        message:'What would you like to do?',
        choices:[
        "View all Employees",
        "View all Employees by Department",
        "View all Employees by Manager", 
        "Add Employee",
        "Add Roles",
        "Add Department",
        "Update Roles",
        "Exit",
    ],
})

.then ((data) => {
   switch (data.first_question){
       case 'View all Employees':
           viewAll();
           break;

        case 'View all Employees by Department':
            byDepartment();
            break;

        case 'View all Employees by Manager':
            byManager();
            break;

        case 'Add Employee':
            add();
            break;

        case 'Add Roles':
            addRole();
            break;

        case 'Add Department':
            addDepart();
            break;

        case 'Update Roles':
            updateRole();
            break;

       case 'Exit':
       console.log("Thanks for using Tracker have a nice day ")
            connection.end();
            break;
   }
});
};
// view all
const viewAll = () => {
connection.query(`SELECT employee.first_name AS firstname,
 employee.last_name AS lastname,
 role.title AS title ,
 role.salary AS salary,
 department.name AS department,
 CONCAT(e.first_name,',', e.last_name) 
 AS manager FROM employee INNER JOIN role on role.id = employee.role_id 
 INNER JOIN department on department.id = role.department_id 
 LEFT JOIN employee e on employee.manager_id = e.id; `,
(err,res)=>{ 
    if (err) throw err
console.table(res);
startDoc()
});
};
// search by department
const byDepartment = ()=> {
    connection.query(`SELECT employee.first_name AS firstname,
    employee.last_name AS lastname,
    department.name AS department,
    CONCAT(e.first_name,',', e.last_name) 
    AS manager FROM employee INNER JOIN role on role.id = employee.role_id 
    INNER JOIN department on department.id = role.department_id 
    LEFT JOIN employee e on employee.manager_id = e.id; `,(err,res)=>{
        if(err)throw err;
        console.table(res);
        startDoc();
    });
};
// find managers
const byManager = ()=> {
    connection.query(`SELECT employee.first_name AS firstname,
    employee.last_name AS lastname,
    CONCAT(e.first_name,',', e.last_name) 
    AS manager FROM employee INNER JOIN role on role.id = employee.role_id 
    INNER JOIN department on department.id = role.department_id 
    LEFT JOIN employee e on employee.manager_id = e.id; `,(err,res)=>{
        if(err)throw err;
        console.table(res);
        startDoc();
    });
};


const addEmployee = [
    {
        type:'input',
        name:'firstName',
        message:'Whst is the first name ?',
    },
    {
        type:'input',
        name:'lastName',
        message:'What is the last name ?',
    
    },
    {
        type:'input',
        name:'role',
        message:"what is the employee'e role please enter a number between 1 and 5",
    },
    {
        type:'input',
        name:'manager',
        message:'Who is the manager please enter a number between 1 and 3',
}];

    
    const add = ()=>{
    inquirer.prompt(addEmployee)

        .then(data =>{ 
    
connection.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id)VALUE("${data.firstName}", "${data.lastName}",${data.role},${data.manager})`,
(err,res)=>{
    if (err)throw err;
    console.log("employee added");
    // console.log (data.firstname);
    startDoc();
    });

})};

const addRole = ()=>{
    inquirer.prompt([
        {
            type:'input',
            name:'role',
            message:'what role would you like to add',
        },
        {
            type:'input',
            name:'salary',
            message:'what does this position pay anually?',
        },
        {
            type:'input',
            name:'depid',
            message:'please enter a department id'
        }
    ]).then(data =>{
        connection.query(`INSERT INTO role SET ?`,
        {
            title:data.role,
            salary:data.salary,
            department_id:data.depid
        },(err,res)=>{
            if (err)throw err;
    console.log("role added");
    startDoc();
        });
    });
};
 