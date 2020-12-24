# Udacity Frontend Capstone Project - Travel App

## Introduction
This project uses data from three different APIs namely:
- Geonames 
- WeatherBit
- Pixabay

to display information about a user's trip.

## Description
The first API, Geonames, fetches the latitude and longitude coordinates of a user entered location and sends the, to the second API, weatherBit. This API fetches the weather for that location using the date entered by the user and calls the third API to get an image for the user entered location. The app then displays these information unto the user in a user-friendly method.

## Requirements
To use this app, you will have to get a key for each of the specified APIs listed above. After you get your keys, create a *.env* file in the project root folder and inser the fllowing line below
```
user = your geonames api key
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