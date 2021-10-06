# Sprint Goal

The goal for this sprint is to work on two main epics **Auth** (BAC-7) and **Admin** (BAC-25). The goal is to have user authentication completed in regards to both the frontend and backend components. Simple admin functionality such as user verification through government identification is also a main goal of this sprint in both the frontend and backend systems.

The following indivuals are participating in the current sprint and task division is stated on JIRA:
  - Payam Yektamaram
  - Steven Hans Limantoro
  - Krutik Tejalkumar Shah
  - Tanzim Ahmed
  - Tony Chen
  - Mark (LiangShu) Chen
  - Pasa Aslan

# Sprint Stories & Subtasks

- **(BAC-1, Auth, 8 Pts)** As a first time user, I want to create an account so that I can access the services that are provided by Pawsup.
  - **BAC-26** Backend - Determine Authentication Provider
  - **BAC-46** Backend - Determine Authorization Roles 
  - **BAC-27** Backend - POST Endpoint to Create User 
  - **BAC-47** Backend - Unit Testing 
  - **BAC-28** Frontend - Create Signup Screen 
  - **BAC-35** Frontend - Redux Init for User Data 
  - **BAC-50** Backend - Swagger UI 
- **(BAC-2, Auth, 3 Pts)** As a returning user, I want to be able to login into my account so that I can access services provided by Pawsup. 
  - **BAC-29** Backend - POST Login Credentials 
  - **BAC-30** Frontend - Create Login Screen 
  - **BAC-52** Backend - Swagger UI 
  - **BAC-53** Frontend - Storybook 
- **(BAC-3, Auth, 5 Pts)** As a returning user, I want to be able to reset my password so that I can access services provided by Pawsup in the event I forget my credentials. 
  - **BAC-32** Backend - POST Request to Reset Password 
  - **BAC-33** Backend - POST Reset Password 
  - **BAC-48** Backend - Unit Testing 
  - **BAC-54** Backend - Swagger UI 
  - **BAC-34** Frontend - Reset Password Screen & Logic 
  - **BAC-55** Frontend - Storybook 
- **(BAC-22, Auth, 2 Pts)** As a returning user, I would like the ability to log out of my account so that I can maintain proper security. 
  - **BAC-37** Backend - POST Kill Token 
  - **BAC-57** Backend - Swagger UI 
  - **BAC-62** Backend - Unit Testing 
  - **BAC-36** Frontend - Create Logout Action 
  - **BAC-56** Frontend - Storybook 
- **(BAC-6, Admin, 8 Pts)** As an admin, I would like to allow my users to upload their government identification so I can verify their information and contact them in an emergency. 
  - **BAC-39** Backend - Create S3 Secret Bucket 
  - **BAC-40** Backend - POST Upload Images Securely 
  - **BAC-58** Backend - Swagger UI 
  - **BAC-63** Backend - Unit Testing 
  - **BAC-38** Frontend - Allow users to upload government identification
  - **BAC-59** Frontend - Storybook 
- **(BAC-41, Admin, 8 Pts)** As an admin, I would like the ability to verify the uploaded government credentials so that I can verify users on Pawsup Created
  - **BAC-42** Backend - Retrieve Image from Bucket 
  - **BAC-45** Backend - PUT Approve User 
  - **BAC-60** Backend - Swagger UI 
  - **BAC-43** Backend - Retrieve S3 Object Link fro... 
  - **BAC-64** Backend - Unit Testing 
  - **BAC-44** Frontend - Create Admin View to Appro... 
  - **BAC-61** Frontend - Storybook 

# Team Capacity

As we can deduce from above we are commited to 34 story points for the first sprint and we have as a team decided to never commit to more then 40 story points in a single sprint.

# Spikes
- Figure out authentication provider and how ato uthenicate/authorize both frontend and backend systems
- How to retrieve documents from an user's phone on the frontend system
- How to create/use a S3 bucket in an encrypted manner