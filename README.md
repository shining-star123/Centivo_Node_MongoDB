`MongoDB 8.0`
```mongodb --dbpath ./db```

`Node.js`
```npm start```

`If you want to add a user`
```POST http://localhost:5000/users```

`If you get users`
```GET http://localhost:5000/users/67e200d37d68c07ba6cb19d5```

There is only one user: Thomas, thomasmorris0105@gmail.com, 21

``This API provides an endpoint that retrieves user details from a MongoDB collection.
If the user is not found or the age is less than 21, a 404 error is returned. Invalid ObjectId format is handled with a 400 error response.
It accepts a user ID and returns the user details if the user exists and their age is greater than 21. ``
