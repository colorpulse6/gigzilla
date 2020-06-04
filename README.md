# gigzilla
## Description
Gigzilla offers a convenient platform for musicians to build tours and collaborate with venues.

## User stories
- login-signup - As a user I would like to see a welcome page that gives me the option to sign up as a mucician or a venue

- login-signin - As a user I would like to safely login to the database with secure information

### Musician User
- musician-homepage - As a user I would like to have a homepage that lists my current tours and allows me to tours to my list

- musician-tour-page - As a user I would like to have a tour page that holds information for tours I am building with a search bar that allows me to search cities and add them to my tour

- musician-city-page - As a user I would like to have a page where I can see the venues that a certain city has with basic information on each venue.  This page should also contain a radio that tells me whether or not the venue has been contacted

- musician-venue-page - As a user I would like a page that has all the information on a specific venue I am interested in as well as a contact form.

- musician-profile - As a user I would like to have a preferences page where I can add or edit information for my account

### Venue User
- home-venue - As a user, I want to view any tours that are planning to be in my city.
- venue-tour - As a user, I want to look up information about the specific tour I am interested in and if I decide I want them to play at my venue, be able to contact them.
- venue-profile - As a user, I want to be able to check and edit details about my venue. 

## API routes (back-end)
- GET /
    - render landing.hbs
- GET /auth/signup
    - render signup.hbs
- POST /auth/signup
    - redirects to /home/musician or /home/venue if user signs up
    - body: 
        - email
        - password
        - name
        - type of user
- GET /auth/login
    - render login.hbs
- POST /auth/login
    - redirects to /home-musician or /home-venuee if user logs in
    - body: 
        - email
        - password
- POST /auth/logout
- GET /home/musician
    - renders musician-home.hbs
    - body: 
        - build tour button
        - tours (that have been created by user)
        - navbar
            - profile
            - tours
            - settings
- POST /home/musician 
    - modal: 
        - tour name input field
        - create tour button
    - redirects to /home/musician/:tour
- GET /home/musician/:tour
    - renders tour.hbs
    - body:
        - search form
        - add city button
        - list of cities that will link to /home/musician/:tour/:city
- POST /home/musician/:tour
    - adds cities to same page
- GET /home/musician/:tour/:city
    - renders city.hbs
    - body: 
        - filter form
        - list of venues that will link to /home/musician/:tour/:city/:venue
- POST /home/musician/:tour/:city
    - filter will adjust venue list on page
- GET /home/musician/:tour/:city/:venue
    - renders venue.hbs
    - body: 
        - venue name
        - venue details
        - contact form
- POST home/musician/:tour/:city/:venue
    - contact form 
    - redirect to /home/musician/:tour
- GET home/venue
    - renders venue-home.hbs
    - body: 
        - list of tours that will each link to /home/venue/:tour
- GET home/venue/:tour
    - renders venue-tour.hbs
    - body:
        - tour name
        - tour description and details
        - contact form
- POST home/venue/:tour
    - contact form
    - redirects to home/venue
- GET /profile/musician
    - renders musician-profile.hbs
    - body: 
        - name
        - email
        - phone number
        - grenre
        - photo
        - bio
- GET /profile/venue
    - renders venue-profile.hbs
    - body: 
        - name
        - email
        - phone number
        - city
        - photo
        - capacity
        - type
        - isAvailable

## Models
- UserMusician new Schema ({musicianId:, name: String, email: String, phone number: Number, genre: String, photoSrc: String, bio: String})
- Tour new Schema ({name: String, photoSrc: String, musicianId, contactedByVenue: Boolean, cities: [ ]})
- City new Schema ({name: String, cityId:})
- UserVenue new Schema ({name: String, email: String, phone number: Number, cityName: String, imgUrl: String, cityId.populate, isBooked: Boolean, backline: Boolean, food: Boolean, venueId: Number, capacity: Number, type: String, contactedByTour: Boolean, isAvailable: Boolean, contactedTour: Boolean
})

## Backlog
- External API for venues
- Additional map functionality
- Venue calendar functionality
- Follow up/reminders 
- Add filter to venue's homepage to filter tours
- Error pages

## Links
### Trello
[Link Url](https://trello.com/b/Z5qOXq4I/gigzilla)

### Git
[Repository Link](https://github.com/colorpulse6/gigzilla)
[Deploy Link]()

### Slides
[Google Slides Url]()