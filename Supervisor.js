const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require ("cli-table3");


var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
 
    user: "root",
  
    password: "Mypassword88!",
    database: "bamazon"
});

//function that displays Supervisor options
function SupervisorRole () {
    inquirer.prompt([
        {
            type: "list",
            name: "SupervisorRole",
            message: "Please choose one of the following options.",
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then(function(user) {

        if (user.SupervisorRole === "View Product Sales by Department") {
            connection.query("SELECT dept.department_id, dept.department_name, dept.over_head_costs, SUM(products.product_sales) AS 'product_sales' FROM departments AS dept JOIN products ON dept.department_name = products.department_name GROUP BY dept.department_id",
                function(err, product) {
                    if (err) throw err;


                    //code used to create table

                    var table = new Table({
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                               , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                               , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                               , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                    });

                    table.push(
                        ["Department ID", "Department Name", "Over Head Costs", "Product Sales", "Total Profits",]
                    );

                    for (var i = 0; i < product.length; i++) {
                        table.push([product[i].department_id, product[i].department_name, product[i].over_head_costs, product[i].product_sales, product[i].product_sales - product[i].over_head_costs]);
                    }

                    console.log(table.toString());
                    connection.end();
            });
        } else if (user.SupervisorRole === "Create New Department") {
            inquirer.prompt([
                {
                    type: "input",
                    name: "departmentName",
                    message: "Please add the department name:",
                },
                {
                    type: "input", 
                    name: "departmentOverhead",
                    message: "Please enter the department overhead costs:"
                }
            ]).then(function(user) {
                connection.query("INSERT INTO departments SET ?",
                    {
                        department_name: user.departmentName,
                        over_head_costs: user.departmentOverhead
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Department successfully added.")
                        connection.end();
                    }
                )
            });       
        }
    });
}

//starts the program
SupervisorRole();