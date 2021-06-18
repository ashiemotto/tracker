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
    }];

    const roles = ()=>{
        inquirer.prompt(modle)
        

        .then(data =>{
            const roleID =modle.choices.indexOf(data.role)
            connection.query(`INSERT INTO employee SET ?`,{
                role_id:roleID
            })
            managers()
        })
    }
    const modle=
    {
        type:'list',
        name:'role',
        mwssage:"what is the employee'e role?",
        choices:[
            "master tech",
            "sales assosiate",  
            "wash kid",    
            "service writter",
            "tech",
        ],   
    }
    const list =
    {
        type:'list',
        name:'manager',
        message:'Who is the manager',
        choices:[
            'Ashton Headley',
            'Cara Simms',
            'Gordi Tam',
        ],
    }

    const managers = ()=>{
        inquirer.prompt(list)
        

        .then(data =>{
            const managerID =list.choices.indexOf(data.manager)
            connection.query(`INSERT INTO employee SET ?`,{
                // first_name:data.firstname,
                // last_name:data.lastname,
                // role_id:data.roleID,
                manager_id:managerID
            })
            startDoc()
        })
    }
    const add = ()=>{
    inquirer.prompt(addEmployee)

        .then(data =>{ 
connection.query(`INSERT INTO employee SET ?`,
{
    first_name: data.firstname,
    last_name: data.lastname
},
   roles()

)
})

}
 