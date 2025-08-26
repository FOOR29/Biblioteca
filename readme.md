# Biblioteca CRUD App

A simple CRUD app using JavaScript, Express.js, and MySQL.  
It uploads a CSV file, normalizes its data, and inserts it into a MySQL database.

## Features
- Upload CSV file via web interface.
- Parse and normalize CSV data using JavaScript.
- Insert normalized data into MySQL using Express.js.
- Built with Vite for fast development.

## Technologies
- JavaScript (JS)
- Express.js
- Vite
- Node.js
- MySQL

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FOOR29/Biblioteca.git
   cd Biblioteca



2. Install dependencies

npm install


3. Install required packages (if not installed already)

npm install express
npm install csv
npm install mysql2


4. If you need Express.js (if not installed):

npm install express


5. If you need CSV parsing library:

npm install csv



Usage

1. Start the app with Node:

node <path-to-your-main-js-file>

Replace <path-to-your-main-js-file> with the actual file path.


2. Open the app in your browser (Vite will show you the local URL).


3. Upload a CSV file. The app will normalize the data and upload it to MySQL.



Notes

Make sure your MySQL server is running and you have correct credentials.

Update connection settings in your JS code if needed.

Designed for simple CSV-to-MySQL import and normalization.




MySQL Connection Example

Here is a simple example of how to connect to MySQL using mysql2:

// db.js
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_username",
  password: "your_mysql_password",
  database: "your_database_name",
});

connection.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to MySQL as ID " + connection.threadId);
});

export default connection;

Replace your_mysql_username, your_mysql_password, and your_database_name with your own values.

Make sure the database exists before running the app.