# Kanban App Server

This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

Tech Stack used to build this app :
* Node JS
* Express JS framework
* PostgreSQL

&nbsp;

## Login
- Method: POST
- Route: http://localhost:3000/login
- Request body: 
```
{
  "email": type data string,
  "password": type data string
}
```
- Response:
```
200: 
{
  "access_token": type data string
}

404: 
  {
   "message": "WrongEmail / Password"
  }
```

## Register
- Method: POST
- Route: http://localhost:3000/register
- Request body: 
```
{
  "username": type data string,
  "email": type data string,
  "password": type data string
}
```
- Response:
```
200:
{
  "id": type data integer,
  "email": type data string,
  "username": type data string,
}

400: 
  {
    "errMsg": 
          [
            "Email Required","Password Required",
            "format email is wrong",
            "email must be filled"
          ],
          { "errors": "Email Already Registered" }
  }
```

### Add Task
- Method: POST
- Route: http://localhost:3000/tasks
- Request:
    - headers: access_token

- data:

```json
{
  "title": "string",
  "category": "string",
  "userId": "integer"
}
```

​Response:

- status: 201
- body:
```json
{
  "title": "string",
  "category": "string",
  "userId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```

-status 409
```json
{
    "message": "<required fields> || <date should more than current date>" 
}
```

### Show All Task
- Method: GET
- Route: http://localhost:3000/tasks
- Request:
    - headers:
    - access_token: string

Response:

- status: 200
- body:
```json
{
  "title": "string",
  "category": "string",
  "userId": "integer",
  "createdAt": "date",
  "updatedAt": "date"
}
```
status: 500
```json
{
    "message": "<error messages || internal server error>"
}
```

### Edit Task
- Method: GET
- Route: http://localhost:3000/tasks/:id
- Request:
    - headers: access_token
    - params:
      - id: integer (required)

status: 200
body:
```json
{
  "task": "<task>"
}
```

status: 404
```json
{
  "message": "task not found"
}
```

status: 500
```json
{
  "message": "<error message || internal server error>"
}
```

### Delete Task
- Method: DELETE
- Route: http://localhost:3000/tasks/:id
- Request:
    - headers: access_token
    - params: 
    - id: integer (required)

Response:

- status: 200
- body:
```json
{
    "message": "Task Deleted Successfully"
}
```

-status: 500
```json
{
    "message": "<error message || internal server error>"
}
```

### Update Task
- Method: PUT
- Route: http://localhost:3000/tasks/:id
- Request: 
    - headers: access_token
    - params: 
    - id: integer (required)

Response: 

-status 200
```json
{
    "task": "<updated task>"
}
```

-status: 500
```json
{
    "message": "<error message || internal server error>"
}
```