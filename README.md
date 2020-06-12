# gigzilla
## Description
Gigzilla offers a convenient platform for for musicians and venues to contact each other to make it easier for musicians to build tours and venues to book shows.

## User stories
- landing - As a user I would like to see a welcome page that tells me about the app and has a clear call to action to sign up.

- login-signup - As a user I would like to see a an easy, simple sign up process as a mucician or a venue

- login-signin - As a user I would like to safely login to the database with secure information

### Musician User
- musician-homepage - As a user I would like to have a homepage that lists my current tours and allows me to add tours to my list

- musician-tour-page - As a user I would like to have a page holds all the information about my tour that I am building displaing all the cities I have planned, and also allows me to add cities to my tour. This page should also show a contacted/confirmed status for each venue in each city.

- musician-city-page - As a user I would like to have a page where I can see the venues that are in the city I am going to, with basic information on each venue. This page should also have a search/filter to easier look through venues.

- musician-venue-page - As a user I would like a page that has all the information on a specific venue I am interested in as well as a contact form.

- musician-profile - As a user I would like to have a profile page where I can add or edit information for my account

### Venue User
- venue-homepage - As a user, I want to view any tours that are planning to be in my city.

- venue-tour-page - As a user, I want to look up information about the specific tour I am interested in and if I decide I want them to play at my venue, be able to contact them with a contact form.

- venue-profile - As a user, I want to be able to check and edit details about my venue. 

## API routes (back-end)
### Index Routes
- GET /
    - render landing.hbs (main-layout.hbs)
    - body:
        - link to signup as musician
        - link to signup as venue
        - sign in as existing user

### Authentication Routes
- GET /signup/musician
    - render musician-signup.hbs (main-layout.hbs)
- POST /signup/musician
    - redirects to /home/musician if user signs up
- GET /signup/venue
    - render venue-signup.hbs (main-layout.hbs)
- POST /signup/venue
    - redirects to /home/venue if user signs up
- GET /signin
    - render login.hbs (main-layout.hbs)
- POST /signin
    - redirects to /home/musician or /home/venue if user logs in
- GET /signout
    - redirects to / if user logs out

### Musician Routes
- GET /home/musician/profile
    - renders musician-profile.hbs (musicianLayout.hbs)
- POST /home/musician/profile
    - edit profile functionality
    - redirects to /home/musician/profile
- GET /home/musician
    - renders musician-home.hbs (musicianLayout.hbs)
    - body: 
        - build tour button
        - tours (that have been created by user)
- POST /home/musician
    - redirects to /home/musician/:tour
    - body (modal):
        - tour name input field
        - create tour button
- GET /home/musician/delete/:tourId
    - delete a tour
    - redirects to /home/musician
- GET /home/musician/:tour
    - renders musician-tour.hbs (musicianLayout.hbs)
    - body:
        - input for city name
        - add city button
        - list of cities, each will link to /home/musician/:tourId/:cityName
- POST /home/musician/:tourId
    - adds cities to tour
    - redirects to /home/musician/:tour
- GET /home/musician/:tourId/:cityName
    - renders musician-cities.hbs (musicianLayout.hbs)
    - body: 
        - search/filter form
        - list of venues, each will link to /home/musician/:tourId/:cityName/:venueId
- GET /home/musician/:tourId/:cityName/:venueId
    - renders musician-venues.hbs (musicianLayout.hbs)
    - body: 
        - venue details
        - contact form
- POST /home/musician/:tourId/:cityName/:venueId
    - contact form 
    - redirects to /home/musician/:tour
- GET /home/musician/:tourId/:cityId/:venueName/add
    - confirm venue
    - redirects to /home/musician/:tour

### Venue Routes
- GET /home/venue/profile
    - renders venue-profile.hbs (venue-layout.hbs)
- POST /home/venue/profile
    - edit profile functionality
    - redirects to /home/venue/profile
- GET /home/venue
    - renders venue-home.hbs (venue-layout.hbs)
    - body: 
        - list of tours in venue's city
- GET /home/venue/:tour/add-confirmed
    - confirms tour for the venue
    - redirects to /home/venue
- GET home/venue/:tour
    - renders venue-tour.hbs (venue-layout.hbs)
    - body:
        - tour details
        - contact form
- POST home/venue/:tour
    - contact form
    - redirects to /home/venue

## Models
- MusicianUser new Schema ({name: String, email: String, tours: [{'Tour'}], password: String, phoneNumber: Number, genre: String, imgUrl: String, bio: String})

- Tour new Schema ({name: String, imgUrl: String, cities [{name: String, selectedVenue: {'VenueUser'}, contactedByVenue: Boolean, contactedByMusician: Boolean, possibleVenues: [String]}]})

- VenueUser new Schema ({name: String, email: String, password: String, cityName: String, phoneNumber: String, imgUrl: String, description: STring, isBooked: Boolean, isAvailable: Boolean, backline: Boolean, isContacted: Boolean, food: Boolean, capacity: Number})

## Backlog
- External API for venues
- Additional map functionality
- Venue calendar functionality
- Follow up/reminders 
- Add filter to venue's homepage to filter tours
- Error pages
- Archive tours

## Links
### Trello
[Link Url](https://trello.com/b/Z5qOXq4I/gigzilla)

### Git
[Repository Link](https://github.com/colorpulse6/gigzilla)
[Deploy Link](https://gig-zilla.herokuapp.com/)

### Slides
[Google Slides Url](https://docs.google.com/presentation/d/1R6expLXcZ6Zb12oN9Rv6FGXbIInhQkJjGaCkAX0AyJg/edit?usp=sharing)