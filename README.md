# ts-mysql-graphql-library-backend
A library backend project build on Typescript, MySQL (with Sequelize ORM), and GraphQL.<br/>
<br/>
Features Include<br/>
<br/>
1.  Creating Users (by default member, manually change them to staff)<br/>
2.  Bulk Add Inventory<br/>
3.  Get Catalogue of Unique books<br/>
4.  Get the list of inventory<br/>
5.  Mark a book as non issueable (in case the book is torn)<br/>
6.  Issue a book<br/>
7.  Return the issued book<br/>
8.  Get List of Issued Books<br/>
9.  Get Report on the issued books<br/>
10. Charge late fees from users<br/>
11. Payment of the late fees by the members<br/>
<br/>
To use the backend, create an .env file with the following variables.<br/>
<br/>
PORT <br/>
DB_USERNAME <br/>
DB_PASSWORD <br/>
DB_NAME <br/>
DB_HOST <br/>
JWT_SECRET <br/>
<br/>
Also find the GraphQL Collection here: https://shorturl.at/oPU68
