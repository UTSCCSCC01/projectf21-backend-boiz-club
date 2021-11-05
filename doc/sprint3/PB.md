# Product Backlog


## User Story

### Account Information
---
<span style="color: orange"> Priority: Medium </span>
* As a user, Sarah Gallagher would like to be able to upload a custom profile picture.
    * COS: Ensure sure users can upload profile picture.
    * COS: Ensure profile picture is displayed under the account menu.
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
<span style="color: orange"> Priority: Medium </span>
* As a customer, Sarah Gallagher would like to be able to see the details of a service by clicking on a service on the services list.
   * CoS: Show modal with service details when user clicks on a service in the list view
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
* As a verified customer, Sarah Gallagher would like to be able to cancel a service or product she has purchased so that she can retrieve her money for a service/product she no longer needs.
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