# Water My Plants (Backend)

Heroku Deployment(https://webpt9-water-my-plants.herokuapp.com/)

Sections:
- [API Endpoints](#api-endpoints)
- [Tables](#tables)

## API Endpoints

Section Contents:
- [/api/auth/login POST](#authlogin-post)
- [/api/auth/register POST](#authregister-post)
- [/api/:user_id/plants GET]
- [/api/:user_id/plants POST]
- [/api/:user_id/plants/:id PUT]

### /api/auth/login POST

Expects an object with this format as the request body:
```
{
  "username": "Fred Thomas",   //string
  "password": "pass" //string
}
```

Below is the default users.

```
{
  "username": "Fred Thomas",   //string
  "password": "pass", //string
  "user_id": 1
}
{
  "username": "Frank Billings",   //string
  "password": "youshallnotpass", //string
  "user_id": 1
}
{
  "username": "John Smith'",   //string
  "password": "myprecious", //string
  "user_id": 1
}
```

If the username doesn't exist in the [`users`](#users) table or the password doesn't match, it will reject the request with a `401` HTTP status.

If successful, it will return with a `200` HTTP status and an object with this format:
```
{
    "message": "User logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZyZWQgVGhvbWFzIiwiaWQiOjEsImlhdCI6MTU4Mjk0OTk4NywiZXhwIjoxNTgzMDM2Mzg3fQ.H0A6n1SVIua-wYDgeBRvoJ3w09XBqXv1Mt4hfS0tiO4",
    "user": {
        "id": 1,
        "username": "Fred Thomas",
        "password": "$2a$08$DUgI9rLgYhsUDcgFJTxNQOWyra.RxOTrHvPZ.uGcNSg2v/F5kjuYa",
        "phoneNumber": "9895502785"
    }
}
```
- `token`: A JSON Web Token

[Top of API section](#api-endpoints) | [Top of page](#water-my-plants-backend)

### /api/auth/register POST

Expects an object with this format as the request body:
```
{
  "username": "User1",    // required/string/unique
  "password": "password", // required/string
  "phoneNumber": "9894439987", // required/string
}
```
If any of the required fields are missing, it will reject the request with a `400` HTTP status.

If successful, it will return with a `201` HTTP status and an object with this format:
```
{
    "message": "User registered",
    "id": 4
}
```

[Top of API section](#api-endpoints) | [Top of page](#water-my-plants-backend)

### /api/:user_id/plants GET

Requires an Authorization in the Header with the JWT Token.  Without the token you will get a 401 status.  The user_id can be found by req.user.id

If successful, it will return with a `201` HTTP status and an object of all the plants associated with the user_id in this format:
```
{
        "id": 1,
        "nickname": "Aloe Vera",
        "species": "Aloee",
        "h2oFrequency": 3,
        "image": "https://www.houseplantsexpert.com/image-files/aloevera.jpg",
        "user_id": 1
}
```

[Top of API section](#api-endpoints) | [Top of page](#water-my-plants-backend)

### /api/:user_id/plants POST

Requires an Authorization in the Header with the JWT Token.  Without the token you will get a 401 status.  The user_id can be found by req.user.id

Expects an object with this format as the request body:
```
{
        "nickname": "Aloe Vera",  //required/string/unique
        "species": "Aloe",  //required/string
        "h2oFrequency": 3,  //required/integer 1 to 10
        "image": "https://www.houseplantsexpert.com/image-files/aloevera.jpg",  //optional
        "user_id": 1  // required - get from req.user.id
}
```

If successful, it will return with a `201` HTTP status and an object of in this format:
```
{
        "id": 1,
        "nickname": "Aloe Vera",
        "species": "Aloee",
        "h2oFrequency": 3,
        "image": "https://www.houseplantsexpert.com/image-files/aloevera.jpg",
        "user_id": 1
}
```

[Top of API section](#api-endpoints) | [Top of page](#water-my-plants-backend)

### /api/:user_id/plants/:id PUT

Requires an Authorization in the Header with the JWT Token.  Without the token you will get a 401 status.  The user_id can be found by req.user.id

Update only the key & values you need to.  It expects an object with this format as the request body:
```
{
        "nickname": "Aloe Vera",  //optional/string/unique
        "species": "Aloe",  //optional/string
        "h2oFrequency": 3,  //optional/integer 1 to 10
        "image": "https://www.houseplantsexpert.com/image-files/aloevera.jpg",  //optional
}
```

If successful, it will return with a `201` HTTP status and an object of in this format:
```
{
        "id": 1,
        "nickname": "Aloe Vera",
        "species": "Aloee",
        "h2oFrequency": 3,
        "image": "https://www.houseplantsexpert.com/image-files/aloevera.jpg",
        "user_id": 1
}
```

[Top of API section](#api-endpoints) | [Top of page](#water-my-plants-backend)