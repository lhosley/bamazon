DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER (10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    price INTEGER (10) NOT NULL,
    stock_quantity INTEGER (10) NOT NULL,
    product_sales INTEGER (10) NOT NULL DEFAULT 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apples", "Fruits", 7, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bananas", "Fruits", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oranges", "Fruits", 8, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carrots", "Vegetables", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tomatos", "Vegetables", 300, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ribeye Steaks", "Meats", 30, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken Breasts", "Meats", 15, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lucky Charms", "Cereal", 5, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trix", "Cereal", 6, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cocoa Crispies", "Cereal", 7, 200);

CREATE TABLE departments (
	department_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(11) NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Fruits", 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Vegetables", 20000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Meats", 50000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Cereal", 8000);