
## Run Command
in two separate terminal 
```bash
npm run json:server
npm start
```

## To Test 

Point your browser to 

[http://localhost:4000/graphql/](http://localhost:4000/graphql/)

use the following query

### query for a single employee
```json
{
  employee(id: 2) {
     name
     email
  }
}
```

### query for all employee
```json
{
  employees{
     name
     email
     age
  }
}
```

### add en amployee
```json
mutation {
   addEmployee(name:"John John John", email:"john3@gmail.com", age: 46){
      name
      email
      age
   }
}
```


### update en amployee
```json
mutation {
   editEmployee(id: 3, age: 40){
      name
      email
      age
   }
}
```

### update en amployee
```json
mutation {
   deleteEmployee(id: 2){
      id
   }
}
```
