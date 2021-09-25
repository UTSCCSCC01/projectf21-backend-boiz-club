# Product Backlog


## User Story
### Login and Logout
---
<span style="color: red"> Priority: High </span>
* As a first time user, Sarah Gallagher wants to create an account so that she can access the services that are provided by Pawsup.
    * CoS: Ensure that new users are able to create accounts on both iOS and android.
    * CoS: Ensure that new users are not allowed to make multiple accounts under the same email.
    * CoS: Ensure that new users are given the proper roles (i.e should not be able to see admin stuff). 
    * CoS: Ensure that new users create an account with a strong password of length 8, consisting of at least one uppercase, lowercase, and special character. 
---
<span style="color: red"> Priority: High </span>
* As a returning user, Sarah Gallagher wants to be able to login into her account so that she can access services provided by Pawsup.
    * CoS: Ensure that users on both iOS and android are able to sign back into their account if provided correct credentials.
    * CoS: Ensure that users who are not registered cannot log in.
    * CoS: Ensure that users with an account cannot sign it with an old password.
---
<span style="color: red"> Priority: High </span>
* As a returning user, Sarah Gallagher would like the ability to log out of her account so that she can maintain proper security.
    * CoS: Ensure that logged in users, can log out of their accounts on both iOS and android.
    * CoS: Ensure that once logged in users have logged out that they are prompted for their credentials.
---
### Account Information
---
<span style="color: red"> Priority: High </span>
* As a returning user, Sarah Gallagher wants to be able to reset her password so that she can access services provided by Pawsup in the event she forgets her credentials.
    * CoS: Ensure that users on both iOS and android can reset their passwords if their email has a registered account associated with it.
    * CoS: Ensure that users who don't have an account cannot reset their password.
---
<span style="color: purple"> Priority: Low </span>
* As a user, Sarah Gallagher would like to be able to edit her account information so that she can personalize her profile.
    * CoS: Ensure that users on both IOS and android can update their emails.
    * CoS: Ensure that users can update their name.
    * CoS: Ensure that users can update their location.
    * CoS: Ensure that users can change their password.
---
### Customer
---
<span style="color: red"> Priority: High </span>
* As a customer, Sarah Gallagher would like to search for available services nearby by location so that she can potentially book a service provided by Pawsup.
    * CoS: Ensure that app has access to user's location by sending a request on both iOS and android, if they decline user can manually input location.
    * CoS: Ensure that closest services are showed first to the user.
    * CoS: Ensure that services farther than 100 kilometres from the user's location are not shown.
---
<span style="color: blue"> Priority: Lowest </span>
* As a customer, Sarah Gallagher would like to be able to contact service owners through chat so that she can clarify their provided service or ask any further questions.
    * CoS: Ensure that there is a chat feature that allows pet owners and service providers to communicate in the app
    * CoS: Ensure that pet owners have the ability to start a message conversation with the provider of the service that they are viewing
    * CoS: Ensure that chat history is persisted
    * CoS: Ensure that users can clear their chat history with another user
---
<span style="color: orange"> Priority: Medium </span>
* As a customer, Sarah Gallagher would like to be able to browse products sold in her area so that she can purchase goods for her pets.
   * CoS: A customer can perform a locations filtered search for products in the store page
---
<span style="color: red"> Priority: High </span>
* As a customer, Sarah Gallagher would like to be able to save services and products to her cart so that she can keep track of all the things she wishes to purchase.
   * CoS: A customer can add a service / product to the cart
   * CoS: A customer can remove a service / product to the cart
   * CoS: The state of the cart after every operation is saved even after the app is restarted
---
<span style="color: purple"> Priority: Low </span>
* As a customer, Sarah Gallagher would like to be able to see a rough location of the service on a map so that she can know if she is in range of the service.
   * CoS: Ensure that every service has a location specified during its creation
   * CoS: A customer can see the approximate location of the service on a map inside the service details page
---
<span style="color: purple"> Priority: Low </span>
* As a verified customer, Sarah Gallagher would like to be able to rate past services she has used so that she can inform other users regarding the quality of service they can expect.
   * CoS: Ratings of the verified customer can be seen in the service page by another customer
   * CoS: A verified customer should only be able to rate services that they've purchased
---
<span style="color: purple"> Priority: Low </span>
* As a verified customer, Sarah Gallagher would like to receive a confirmation email once she has purchased a service or product so that she can know that her order went through successfully.
   * CoS: If the order is successfully purchased, then a confirmation email has to be sent. In this case, the confirmation email has to include the followings:
        - Order ID
        - Time of purchase
        - Date of purchase
        - List of service and/or product purchased
        - Price of each service and/or product, and the total price
---
<span style="color: red"> Priority: High </span>
* As a verified customer, Sarah Gallagher would like to be able to cancel a service or product she has purchased so that Ishe can retrieve her money for a service/product she no longer needs.
   * CoS: Cancellation is only acceptable after a certain period of time.
        - The user will automatically get a refund
   * CoS: If the deadline has passed, the cancellation should be rejected by the system and user should be informed about the reason
        - The user will not get a refund
---
<span style="color: red"> Priority: High </span>
* As a verified customer, Sarah Gallagher would like to be able to purchase services through the app directly so that she can gain access to the services directly from the app.
   * CoS: Ensure that pet owners who have been verified(gov id) can view and purchase a listed service
   * CoS: Ensure that pet owners can use a form of payment (e.g. apple pay, credit card, paypal, etc.) to pay directly through the app
   * CoS: Ensure that pet owners who have not been verified(gov id) cannot view or purchase listed services on the platform
   * CoS: Ensure that pet owners purchasing a service are fully aware of the complete and final cost of the service before confirming the payment
---
### Seller
---
<span style="color: red"> Priority: High </span>
* As a service provider, David Cunningham would like to be able to list his service on Pawsup so that he can advertise his services.
   * CoS: Ensure that potential service providers can provide a pet service through the app
   * CoS: Ensure that service providers can specify information in the service listing such as pricing, location, description, accepted pets, time of service
   * CoS: Ensure that listed services can be taken down by the service provider
---
<span style="color: red"> Priority: High </span>
* As a service provider, David Cunningham would like to be able to modify his existing listed service so that he can make sure his service information is up-to-date.
   * CoS: Customers can view the history of modifications to an existing service inside the details page of the service
   * CoS: Service providers can only modify services that they own
---
<span style="color: orange"> Priority: Medium </span>
* As a service provider, David Cunningham would like to be able to accept or reject incoming services requested by customers depending on his ability to fulfill their request.
   * CoS: The service provider is able to block out certain date and time based on his availabilities.
   * CoS: No customers will be able to request for a service to the provider during the blocked period.
   * CoS: When the service provider is available, the provider still has the option to accept or reject the requests from customers.
---
### Administration
---
<span style="color: orange"> Priority: Medium </span>
* As an admin, Christine Crawford would like to allow her users to upload their government identification so she can verify their information and contact them in an emergency.
   * CoS: Ensure that users can upload their government id
   * CoS: Ensure that admins can verify a submitted government id
   * CoS: Ensure that once a government id is verified, users have access to services, etc.
   * CoS: Ensure that admins can reject a government id and request the rejected user to re-submit their id
---
<span style="color: orange"> Priority: Medium </span>
* As an admin, Christine Crawford would like the ability to approve or decline the right for a user to provide a service so that Pawsup maintains a reputation of trustworthy and reliable platform that provides unique services.
   * CoS: Ensure that admins can take down any service listed on the platform
   * CoS: Ensure that admins can deny any user from listing services on the platform
   * CoS: Ensure that admins can grant users who do not have sufficient permissions, the ability(permissions) to list services on the platform
---
<span style="color: blue"> Priority: Lowest </span>
* As an admin, Christine Crawford would like to be able to modify the service fees charged to customers and service providers to meet company budget.
   * CoS: 
        * Customers: 
            - If the service fee is modified after a customer purchases a service, then the customer should not be charged with the new fee.
            - The service fee is only applicable for a customer who purchases a service after the fee is modified.
        * Service Providers: 
            - If the service fee is modified after a provider publishes a service, then the provider should not be charged with the new fee.
            - The service fee is only applicable for a provider who publishes a service after the fee is modified.
---