![alt text](frontend/public/README/Navigation/Homepage.png)

Welcome to the my personal planner site!! Surf around play some trivia, read some jokes or even play some music from you spotify account!

Follow the link below and try it out!

https://personalplanner-11519afe1d1f.herokuapp.com/

<h1>User Stories</h1>

<details>
<summary> User </summary>
<li>As a user i would like to leave and delete comments when logged in</li>
<li>As a user i would like to test my trivia skills</li>
<li>As a user i would like the ability to play spotify music while on the site</li>
</details>
<br>
<h1>User Interface</h1>

<details>
<summary> Navigation </summary><br>

![alt text](frontend/public/README/Navigation/Navigation.png)
<br>
<li>This is the main navigation of the website which holds the main links</li>
<li>From here you will be brought to the corresponding homepage of each element where there will be a sub navigation</li>
<br>
</details>

<details>
<summary> Home </summary><br>

![alt text](frontend/public/README/Navigation/Homepage.png)
<br>
<li>This is the general homepage that gives an overal definition of the available functionality of the site</li>
<br>
</details>

<details>
<summary> Jokes Homepage </summary><br>

![alt text](frontend/public/README/Navigation/Jokes_HomePage.png)
<br>
<li>This is the main homepage for the jokes section of the site</li>
<li>From here you can access 3 different types of jokes (General, Dad and Chuck Norris)</li>
<li>If the user has created / logging into their personal account they can leave comments on their favorite jokes</li>
<br>
</details>

<details>
<summary> Wordplay Homepage </summary><br>

![alt text](frontend/public/README/Navigation/WordPlay_HomePage.png)
<br>
<li>This is the main homepage for the WordPlay section of the site</li>
<li>From here you can try to solve some riddles, learn some new quotes or test your trivia skills!!</li>
<li>If the user has created / logging into their personal account they can leave comments on their favorite quotes</li>
<br>
</details>

<details>
<summary> Music </summary><br>

![alt text](frontend/public/README/Navigation/Music.png)
<br>
<li>Here you will find your basic spotify user information and the current user token you have. You can also search playlists or songs to get some music going.</li>
<br>
</details>

<details>
<summary> Login / Sign-Up</summary><br>

![alt text](frontend/public/README/Navigation/Login.png)
<br>
<li>Here you will have access to sign up or login into your personal account</li>
<li>After creating or loggin into your account you will now have access to comment on the webpage elements</li>
<br>

</details>

<details>
<summary>Profile</summary><br>

![alt text](frontend/public/README/Navigation/Login.png)
<br>
<li>This is the main navigation of the website which holds the main links</li>
<li>From here you will be brought to the corresponding homepage of each element where there will be a sub navigation</li>
<br>
</details>

</details>

<br>
<h1>Technical Data</h1>
<details>
<summary> Technologies Used </summary>

![Cors](frontend/public/README/Technologies/Cors.png)
![CSS](frontend/public/README/Technologies/CSS.png)
![Express](frontend/public/README/Technologies/Express.png)
![HTML](frontend/public/README/Technologies/HTML.png)
![Javascript](frontend/public/README/Technologies/Javascript.gif)
![JWT](frontend/public/README/Technologies/JWT.png)
![MongoDB](frontend/public/README/Technologies/MongoDB.png)
![Mongoose](frontend/public/README/Technologies/Mongoose_Web_Server.svg.png)
![NodeJS](frontend/public/README/Technologies/NodeJS.png)
![React](frontend/public/README/Technologies/React.png)
![Spotify](frontend/public/README/Technologies/Spotify.png)
![Tailwind](frontend/public/README/Technologies/Tailwind.png)
![Vite](frontend/public/README/Technologies/Vite.png)

</details>

<details>
<summary> Installation Instructions </summary>
There is a couple of things to know before making changes to this project.

First we will initialize and installed the according packages necessary. Inside your project terminal run the following commands to complete this.

npm init -y
npm i express mongoose dotenv react-spotify-web-playback nodemon node jwt-simple cors axios vite react-dom react-router-dom react-spotify-web-playback


next you will need to install the software for the CSS framework

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

After this is completed a mongoDB will be necessary to store data. This is done by created a .env file.
Once created you will need to create a variable inside this file for your mongoDB connection. See the example listed below

> MONGODBURI="mongodb+srv://YourUsername:YourPassword@cluster0.ruhgrt4.mongodb.net/YourCollection"

NOTICE!!!!! You will have to replace "YourUsername:YourPassword" and "YourCollection" with your personal mongoDB information

PORT=3000

You will need to sign up for the following free APIs to gain access to your api key

VITE_API_NINJA_KEY="Your api key"

VITE_GIPHY_KEY="Your api key"


The jwt key is used for the token system for the user auth.

JWT_SECRET_KEY="Your Key"


This site is used in conjunction with the spotify web api. You will need to following the set up directions to set this up on the following url

https://developer.spotify.com/documentation/web-api

Once this is set up you will need to put your desired redirection url and client id to the corresponding .env properties

VITE_SPOTIFY_CLIENTID="Your ID"
VITE_SPOTIFY_REDIRECT="Desired URI"


<details>

{// Require the Mongoose package & your environment configurationconst mongoose = require('mongoose');require('dotenv').config()// Connect to MongoDB Atlas\

> mongoose.connect(process.env.MONGODBURI);
> const db = mongoose.connection
>
> db.on('connected', function () {
> console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
> });
>
> // Export models & seed data
> module.exports = {
> Location: require('./Locations'),
> Posts: require('./posts'),
> seedLocations: require('./seed')
> }
> }

</details>
</details>
<details>
<summary> Routes </summary>

---

ROUTE TABLE (Basic Navigation)
----------------------

| URI                      | Rest Route | HTTP Method | Crud Action    | Description                                                           |
| ------------------------ | ---------- | ----------- | -------------- | --------------------------------------------------------------------- |
| /                        | N/A        | GET         | N/A            | Brings the user to the general navigation page                        |
| /jokes/general           | N/A        | GET         | N/A            | Brings the user to general jokes page                                 |
| /jokes/dad               | N/A        | GET         | N/A            | Brings the user to dad jokes page                                     |
| /jokes/chuckorris        | N/A        | GET         | N/A            | Brings the user to chuck norris jokes page                            |
| /wordplay/quotes         | N/A        | GET         | N/A            | Brings the user to quotes page                                        |
| /wordplay/riddles        | N/A        | GET         | N/A            | Brings the user to riddles page                                       |
| /wordplay/trivia         | N/A        | GET         | N/A            | Brings the user to trivia page                                        |
| /profile                 | N/A        | GET         | N/A            | Brings the user to their personal profile page                        |
| /auth/login              | N/A        | GET         | N/A            | Brings the user to the login page                                     |
| /auth/signup             | N/A        | GET         | N/A            | Brings the user to the signuppage                                     |
| /music                   | N/A        | GET         | N/A            | Brings the user to the music page (Login to spotify or see profile)   |
| /accounts.spotify.com/   | N/A        | GET         | N/A            | Once the user clicks the log in button it brings them to the authorization page for spotify|


ROUTE TABLE (MongoDB (USERS))
----------------------

| URI                                       | Rest Route | HTTP Method | Crud Action    | Description                                             |
| ----------------------------------------- | ---------- | ----------- | -------------- |-------------------------------------------------------- |
| /mongo/users/signup/:user                 | N/A        | GET         | Create         | Creates the user profile withiin the mongo database     |
| /mongo/users/login/:user                  | N/A        | GET         | Read           | Gets the corresponding user profile                     |
| /mongo/users/finduser/:email              | N/A        | GET         | Read           | Finds the active user within the database               |
| /mongo/users/addcodeverifier/:data        | Update     | POST        | Update         | Adds spotify code verifier to user profile              |
| /mongo/users/getcodeverifier/:email       | N/A        | GET         | Read           | Finds the spotify code verifier for current user        | 


ROUTE TABLE (MongoDB (Comments))
----------------------

| URI                                       | Rest Route | HTTP Method | Crud Action    | Description                                             |
| ----------------------------------------- | ---------- | ----------- | -------------- |-------------------------------------------------------- |
| /mongo/comments/users/:userId             | N/A        | GET         | Read           | Gets all comments created under active username         |
| /mongo/comments/:contentName              | N/A        | GET         | Read           | Gets all comments connected to content name             |
| /mongo/comments/:commnetId?AuthHeader     | Create     | POST        | Create         | Creates a comment within the mongo db                   |
| /mongo/comments/:commentId?AuthHeader     | Update     | PUT         | Update         | Will update a specific comment in the mongo db          |
| /mongo/comments/:commentId?AuthHeader     | Delete     | Delete      | Delete         | Finds the spotify code verifier for current user        |  


<br>
</details>
<br>
<h1>Extra</h1>
 <details>
 <summary> Struggles </summary>
 <p> Setting up the spotify Oauth was a major hurdle however i learned a ton of new information with the PKCE verification and spotify api during the process so overall it was very beneficial<p>
 </details>
 <details>
 <summary> Future Design </summary>
 <p>In the future i will be adding a planner to the website that will allow the user to schedule their day. The main objective of this site is to provide a one stop shop for people that may be working remotely or just trying to plan their tasks for the day. With this website it wont be necessary to have 10 different browser tabs open. I also plan on giving the user capability to adding links to excel files they are working on or any other website. This will be done through a form on the profile page.<p>
 </details>
