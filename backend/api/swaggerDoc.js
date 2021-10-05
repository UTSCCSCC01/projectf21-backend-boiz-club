/**
 * Routes
 *
 * @swagger
 * /api/v1/users/register:
 *  post:
 *   summary: Create user
 *   tags: [User]
 *   description: Create a new user
 *   consumes:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/NewUserRequest'
 *   responses:
 *    200:
 *     description: Successfully created new user
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    400:
 *     description: Bad request
 *    500:
 *     description : Internal error
 */

/**
 * Models
 *
 * @swagger
 * definitions:
 *  NewUserRequest:
 *   type: object
 *   properties:
 *    username:
 *     type: string
 *     description: Unique username of new user
 *     example: 'Jason96'
 *    email:
 *     type: string
 *     description: Unique email of new user
 *     example: 'jasonwang@gmail.com'
 *    password:
 *     type: string
 *     description: Password of new user
 *     example: '124sx25'
 *  User:
 *   type: object
 *   properties:
 *    _id:
 *     type: string
 *     description: User id
 *     example: '615aa09fc96827a3ba0a5e7c'
 *    username:
 *     type: string
 *     description: Username of user
 *     example: 'Jason96'
 *    first_name:
 *     type: string
 *     description: First name of user
 *     example: 'Jason'
 *    last_name:
 *     type: string
 *     description: Last name of user
 *     example: 'Wang'
 *    address:
 *     type: string
 *     description: Address of user
 *     example: '89 Drive'
 *    phone_number:
 *     type: string
 *     description: Phone number of user
 *     example: '6475718282'
 *    authentication_lvl:
 *     type: string
 *     description: User's permission level
 *     example: 'verified'
 *    createdAt:
 *     type: date
 *     description: Date and time account created
 *     example: '2021-10-04T06:35:11.914Z'
 *    updatedAt:
 *     type: date
 *     description: Date and time account updated
 *     example: '2021-10-04T06:35:11.914Z'
 */

/**
 * Tags
 *
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 */
