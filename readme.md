# Udacity Frontend Capstone Project - Travel App

## Introduction
This app uses data from three different APIs namely:
- Mapbox 
- WeatherBit
- Pixabay

to display information about a user's trip.

## Description
The first API, Mapbox, fetches the latitude and longitude coordinates of a user entered location and sends the, to the second API, weatherBit. This API fetches the weather for that location using the date entered by the user and calls the third API to get an image for the user entered location. The app then displays these information unto the user in a user-friendly method. The user can also enter a packing list for the trip

## Requirements
To use this app, you will have to get a key for each of the specified APIs listed above. You can either get yours or use mine
```
mapAPI = your Mapbox api key
pixAPI = your Pixabay API key
weatherBitAPI = you weatherBitAPI key
```
You will also need to install Node.

Finally, type the following in the command line and press enter for each:
```
npm install
npm run build-prod
npm run start
```
And you should be able to plan your next trip!!!
