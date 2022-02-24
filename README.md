# Project-4: UmmiBobbins A Baby Sitter App

## Background

An app that allows users to either sign up as parent or babysitter. Parents can select a babysitter based on available dates and make a booking. Babysitters can either accept the job or cancel it.

## Github Repo Links

https://github.com/qamarularifin/Project-4_UmmiBobbins_FE
https://github.com/qamarularifin/Project-4_UmmiBobbins_BE

## Heroku Deployment Links

https://project-4-ummibobbins-fe.herokuapp.com/
https://project-4-ummibobbins-be.herokuapp.com/

## Technologies

- MERN Stack: MongoDB, Express JS, React JS, Node JS
- Ant Design
- React-Bootstrap
- Stripe Payment

## Features

### Sign up page (as a Parent or Babysitter)

1. Users are given the option to sign up as a parent or as a babysitter
2. Users are required to provide an email address and password

### Create new profile page

1. New users will be brought to a new create profile page where they get to fill up bio such as name, location, description etc
2. As for new babysitters, they are required to provide the rate per day which will automatically be calculated based on the numbers of days picked by parents

### Parent Home Screen

1. To book a babysitter, parent will first need to select the start date and end date or else, the book now button will not appear
2. Parents can click on View Details button to view more details about the babysitter such as the rate per day
3. Parents can also perform a filter search for the babysitters to select their prefered babysitter
4. Parents can also view messages sent from various babysitters
5. There is also a red tag that indicates the dates unavailable for the babysitters
6. The booking appointments are shown on the right hand side which indicates whether the booking is cancelled or confirmed

### Parent Booking Screen

1. Upon clicking the Book Now button, parents will be brought to a booking screen which indicates the information of the babysitter and most importantly the total booking dates and total amount
2. Parents can then either Return to Homepage or Proceed to book
3. If parents proceed to booking, they will be brought to stripe payment section and make payment
4. Once payment is successful, booking status will be set to "Confirmed"
5. Parents or babysitters can still cancel the booking on each side

### Babysitter Home Screen

1. The babysitter home screen will be somewhat similar to the parent home screen minus the datepicker
2. For babysitters, the only difference is they are able to send a direct message to whichever parent they wish to send a quick note
3. This can be done by clicking on the Message button
4. A default sentence i.e, "Hi I am from baby1@baby1.com" is there to quickly identify who the babysitter is so that the parent who receives the message knows where the message is coming from
5. Once the Send Message button is clicked, the message will be sent to the intended parent and the parent can see the message from the parent home screen under Parent Messages

### Account Settings

1. Both parents and babysitters can choose to edit their email address and enter new password

### Edit Bio

1. Both parents and babysitters can choose to edit their bio/profile

### Admin Mode

1. Admin mode is a special access that gives the admin user the right to view, delete, or edit all users. From these users, we can know these users are tied to which babysitter and parent profile
2. Overall bookings can also be viewed, cancelled or deleted

## Struggles

1. Parent data goes to parent home screen and babysitter data goes to babysitter home screen
2. Only new sign ups will be brought to create new profile page
3. Using mongoose.Types.ObjectId effectively to reference currentBooking from both parent and babysitter model. Problem was when the booking is cancelled, the same is not for the currentBooking array. Hence, using the reference method solved this issue
4. After app was deployed to Heroku for both FE and BE and after booking was made, found out that there is a day difference in the booking date. This was because once backend was deployed through Heroku, there was a time conversion folowing US time zone which i.e, instead of 15 Mar, it was booked as 14 Mar. This was fixed by adding a conversion in the backend payment booking section

## Good to have

- Forgot Password feature
- Socket.io to chat directly between parents and babysitters
- Favourite section to favouritise parent/babysitter
