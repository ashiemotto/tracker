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
    password: ',
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

const byDepartment = ()=> {
    connection.query("SELECT department.id, department.name, employee.first_name, employee.last_name",(err,res)=>{
        if(err)throw err;
        console.table(res);
        startDoc();
    });

};


