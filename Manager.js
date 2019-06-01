const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Mypassword88!",
    database: "bamazon"
});

//function that asks manager to pick an option and performs actions based on which option was chosen

function ManagerRole () {

    inquirer.prompt([
        {
            type: "list",
            name: "managerRole",
            message: "Welcome! Select a manager query to perform.",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function(user) {
        if (user.managerRole === "View Products for Sale") {
            displayProducts();
            connection.end();
        } else if (user.managerRole === "View Low Inventory") {
            connection.query("SELECT * FROM products", function(err, product) {
                if (err) throw err;

                //sets a boolean value to check if any products exist with low inventory
                var lowInventory = false;

                //loops through product array, and if any product's stock quantity is below three, loop breaks and returns lowInventory as true
                for (var i = 0; i < product.length; i++) {
                    if (product[i].stock_quantity < 3) {
                        lowInventory = true;
                    }
                }

                //if lowInventory is true, then logs the relevant products to the console; if not low, logs "No products are low in inventory."

                if (lowInventory) {
                    console.log("The following product(s) are low in inventory:");
                    console.log("--------------------------------------");
                    for (var i = 0; i < product.length; i++) {
                        if (product[i].stock_quantity < 3) {
                            console.log("Item ID: " + product[i].item_id);
                            console.log("Name: " + product[i].product_name);
                            console.log("Num in stock: " + product[i].stock_quantity);
                            console.log("--------------------------------------");
                        }
                    }
                } else {
                    console.log("No products are low in inventory.");
                }

                connection.end();

            });
        } else if (user.managerRole === "Add to Inventory") {

            inquirer.prompt([
                {
                    text: "input",
                    name: "managerProductId",
                    message: "Please enter the Item ID of the product you would like to add to inventory."
                }, 
                {
                    text: "input",
                    name: "managerChangeAmount",
                    message: "How many units would you like to add?"
                }
            ]).then(function(user) {
                connection.query("SELECT * FROM products", function(err, product) {
                    if (err) throw err;
                    
                    connection.query("UPDATE products SET ? WHERE ?", 
                        [
                            {
                                stock_quantity: product[user.managerProductId - 1].stock_quantity +  parseInt(user.managerChangeAmount),
                            },
                            {
                                item_id: user.managerProductId
                            }
                        ],
                        function(err) {

                            if (err) throw err;
                            console.log("Inventory successfully added!");
                            connection.end();
                        } 
                    )
                });
            });
        } else if (user.managerRole === "Add New Product") {

            inquirer.prompt([
                {
                    type: "input",
                    name: "productName",
                    message: "Please enter the product name:"
                }, 
                {
                    type: "input",
                    name: "productDept",
                    message: "Please enter the product department:"
                },
                {
                    type: "input",
                    name: "productPrice",
                    message: "Please enter the product price:"
                },
                {
                    type: "input",
                    name: "productStock",
                    message: "Please enter the product stock quantity:"
                }
            ]).then(function(user) {
                connection.query("INSERT INTO products SET ?",
                    {
                        product_name: user.productName,
                        department_name: user.productDept,
                        price: user.productPrice,
                        stock_quantity: user.productStock
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("Product added!");
                        connection.end();
                    } 
                )
            });
        }
    });
}

//function that lists all available items and relevant information 

function displayProducts() {
    console.log("Here are the products that are for sale.");
    console.log("--------------------------------------");
    connection.query ("SELECT * FROM products", function(err, product) {
        if (err) throw err;
        for (var i = 0; i < product.length; i++) {
            console.log("Item ID: " + product[i].item_id);
            console.log("Name: " + product[i].product_name);
            console.log("Department: " + product[i].department_name);
            console.log("Price: " + product[i].price);
            console.log("Num in stock: " + product[i].stock_quantity);
            console.log("--------------------------------------");
        }
    });
}

//starts the program
ManagerRole();