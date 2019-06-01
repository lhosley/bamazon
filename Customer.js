


const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "Mypassword88!",
    database: "bamazon"
});



//Displays the products for the user

function displayProducts () {
    console.log("Here are the products that are in stock.");
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
        Userinput();
    });

}

//function to gather user product selection and quantity

function Userinput() {

    inquirer.prompt([
        {
            type: "input",
            name: "desiredItemId",
            message: "Please enter the Item ID of the product you would like to buy:"

        }, 
        {
            type: "input",
            name: "desiredQuantity",
            message: "How many units do you want to buy?"
        }
        
    ]).then(function(user) {

        connection.query("SELECT * FROM products", function(err,product) {
            if (err) throw err;
    
            //checks to see if enough product is in stock
            if (user.desiredQuantity <= product[user.desiredItemId - 1].stock_quantity) {
                console.log("--------------------------------------");
                console.log("You're order for " + product[user.desiredItemId -1].product_name + " has been placed!");
                console.log("--------------------------------------");
                console.log("Total Cost: $" + user.desiredQuantity * product[user.desiredItemId - 1].price);

                //update database with new product stock quantity as well as product sales 
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: product[user.desiredItemId - 1].stock_quantity - user.desiredQuantity,
                            product_sales: product[user.desiredItemId - 1].product_sales + user.desiredQuantity * product[user.desiredItemId - 1].price
                        },
                        {
                            item_id: user.desiredItemId
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        console.log("--------------------------------------");
                        console.log("For company: Products updated!");
                        connection.end();
                    }
                )

            } else {
                console.log("Insufficient Quantity. Please enter a new amount or choose another product");

                    //runs function again to let user choose a different quantity or product
                    Userinput();
            }
        });
    });
}

//starts the program
displayProducts();