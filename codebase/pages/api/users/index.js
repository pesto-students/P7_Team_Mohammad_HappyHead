// Path: /pages/api/users/index.js
// The users index handler receives HTTP requests sent to the base users route /api/users. It supports HTTP GET requests which are mapped to the getUsers() function, which returns all users without their password hash property. Security for this and all other secure routes in the API is handled by the global JWT middleware.

// The route handler supports HTTP GET requests by passing an object with a get() method to the apiHandler() function.

// import { apiHandler, usersRepo, omit } from 'helpers/api';

// export default apiHandler({
//     get: getUsers
// });

// function getUsers(req, res) {
//     // return users without hashed passwords in the response
//     const response = usersRepo.getAll().map(x => omit(x, 'hash'));
//     return res.status(200).json(response);
// }