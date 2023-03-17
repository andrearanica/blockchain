# blockchain

Web app that simulates a blockchain made 100% in JavaScript.<br />

The blockchain backend is made in Javascript + Express with MogoDB as DBMS<br />
The frontend is made in React

### :rocket: Functionalities
- Login and registration
- Show all blocks
- Mine new blocks (with PoW algorithm)
- Earn money

### ⚙️ Endpoints
| Method | Endpoint       | Description                    | 
| ------ | -------------- | ------------------------------ | 
| POST   | /auth/login    | Login with username & password | 
| POST   | /auth/register | Register new account           | 
| GET    | /blockchain    | Get the entire blockchain      | 
| POST   | /blockchain    | Add new block                  | 
| GET    | /users         | Get account info               | 

For every request (except login and signup) require a jwt token

### ❤️ Credits 
<a href="https://www.flaticon.com/free-icons/more" title="more icons">More icons created by Freepik - Flaticon</a>
