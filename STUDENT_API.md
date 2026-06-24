# Student API Documentation

Base URL: http://localhost:3000

## Endpoints

### 1) Get all students
- Method: GET
- Path: /students
- Description: Returns all students.
- Response: 200 OK with an array of student objects.

Example:
```bash
curl http://localhost:3000/students
```

### 2) Create a student
- Method: POST
- Path: /students
- Description: Creates a new student.
- Request Body:
```json
{
  "student_id": "S001",
  "name": "John Doe",
  "grade": "A",
  "age": 20
}
```
- Response: 201 Created with the created student object.

Example:
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"student_id":"S001","name":"John Doe","grade":"A","age":20}'
```

### 3) Update a student
- Method: PUT
- Path: /students/:id
- Description: Updates an existing student by ID.
- Request Body:
```json
{
  "student_id": "S001",
  "name": "John Smith",
  "grade": "B",
  "age": 21
}
```
- Response: 200 OK with the updated student object.

Example:
```bash
curl -X PUT http://localhost:3000/students/64f1c2d3e4f5a6789bcdef01 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith","grade":"B"}'
```

### 4) Delete a student
- Method: DELETE
- Path: /students/:id
- Description: Deletes a student by ID.
- Response: 200 OK with a success message.

Example:
```bash
curl -X DELETE http://localhost:3000/students/64f1c2d3e4f5a6789bcdef01
```

## Student Object
```json
{
  "_id": "64f1c2d3e4f5a6789bcdef01",
  "student_id": "S001",
  "name": "John Doe",
  "grade": "A",
  "age": 20,
  "createdAt": "2026-06-24T00:00:00.000Z"
}
```

## Error Responses
- 400 Bad Request: Invalid input or validation error.
- 404 Not Found: Student not found.
- 500 Internal Server Error: Server-side error.
