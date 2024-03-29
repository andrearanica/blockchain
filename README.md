# blockchain

Web app that simulates a blockchain made 100% in JavaScript.<br />

The blockchain backend is made in Javascript + Express with MogoDB as DBMS<br />
The frontend is made in React

### :rocket: Functionalities
- Login and registration
- Show all blocks
- Mine new blocks
- Earn money

### ⚙️ Endpoints
| Method | Endpoint       | Description                    | 
| ------ | -------------- | ------------------------------ | 
| POST   | /auth/login    | Login with username & password | 
| POST   | /auth/register | Register new account           | 
| GET    | /blockchain    | Get the entire blockchain      | 
| POST   | /blockchain    | Add new block                  | 
| GET    | /users         | Get account info               | 

For every request (except login and signup) you need a jwt token<br />
The jwt token is returned by the ```/auth/login``` endpoint and it should be put int the ```Authorization``` header

### ❤️ Credits 
<a href="https://www.flaticon.com/free-icons/more" title="more icons">More icons created by Freepik - Flaticon</a>
