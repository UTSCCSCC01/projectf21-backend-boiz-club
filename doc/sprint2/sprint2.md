# Sprint Goal

The goal for this sprint is to work on two main epics **Admin** (BAC-25) and **Service/Product** (BAC-23). The goal is to have basic service creation and approval to be completed by the end of the sprint. Also the ability for an admin to change the service fees charged on the platform is in scope of the sprint.

The following individuals are participating in the current sprint and task division is stated on JIRA:
  - Payam Yektamaram
  - Steven Hans Limantoro
  - Krutik Tejalkumar Shah
  - Tanzim Ahmed
  - Tony Chen
  - Mark (LiangShu) Chen
  - Pasa Aslan

# Sprint Stories & Subtasks

- **(BAC-3, Auth, 5 Pts)** As a returning user, I want to be able to reset my password so that I can access services provided by Pawsup in the event I forget my credentials. 
  - **BAC-32** Backend - POST Request to Reset Password 
  - **BAC-33** Backend - POST Reset Password 
  - **BAC-48** Backend - Unit Testing 
  - **BAC-54** Backend - Swagger UI 
  - **BAC-34** Frontend - Reset Password Screen & Logic 
  - **BAC-55** Frontend - Storybook 
- **(BAC-12, Service/Product, 8 Pts)** As a service provider, I would like to be able to list my service on Pawsup so that I can advertise my services.
   - **BAC-84** Backend - Create Service Endpoint 
   - **BAC-85** Frontend - Create Service Workflow 
   - **BAC-86** Frontend - Documentation 
   - **BAC-87** Backend - Documentation 
- **(BAC-17, Service/Product, 3 Pts)** As a service provider, I would like to be able to modify my existing listed service so that I can make sure my service information is up-to-date.
  - **BAC-88** Backend - Create Update Service Endpoint 
  - **BAC-89** Frontend - Update Service Workflow 
  - **BAC-90** Frontend - Documentation 
  - **BAC-91** Backend - Documentation 
- **(BAC-16, Service/Product, 8 Pts)** As a customer, I would like to be able to see a rough location of the service on a map so that I can know if I'm in range to the service.
  - **BAC-92** Backend - Get Service Details Endpoint 
  - **BAC-105** Backend - Get the List of Services 
  - **BAC-95** Backend - Documentation 
  - **BAC-93** Frontend - Map Component 
  - **BAC-94** Frontend - Documentation 
- **(BAC-20, Admin, 5 Pts)** As an admin, I would like to be able to modify the service fees charged to customers and service providers so that I can better balance my budget.
  - **BAC-96** Backend - Update Service Fees Endpoint 
  - **BAC-97** Frontend - Admin View to Update Fees 
  - **BAC-98** Frontend - Documentation 
  - **BAC-99** Backend - Documentation 
- **(BAC-9, Admin, 8 Pts)** As an admin, I would like the ability to approve or decline the right for a user to provide a service so that we could maintain Pawsup as a trustworthy and reliable platform that provides unique services.
  - **BAC-100** Backend - Approve/Decline Service 
  - **BAC-101** Frontend - Admin View to Approve/Decline Services 
  - **BAC-102** Frontend - Documentation 
  - **BAC-103** Backend - Documentation 
  - **BAC-104** Backend - Fetch Service Verification 
  
# Spikes
  - Research map libraries that are compatible with a exponent react-native application
  - Research how to verify and convert addresses to their corresponding longitude and latitude coordinates
  
# Team Capacity
As we can deduce from above we are committed to 37 story points for the second sprint and we have as a team decided to never commit to more then 40 story points in a single sprint.
