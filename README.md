# 💰 TrackIt!

## 💻 Technologies & Tools Used
- JavaScript
- CSS
- React 
- Express
- Mongodb
- Tailwind CSS 
- Rechart
- Git & GitHub
- Vite 
- Cyclic 

<br>

![](https://skills.thijs.gg/icons?i=js,css,react,express,mongodb,tailwind,git,github,vite)

<br>

## 🕹 App overview 
With TrackIt! users are able to easily track and analyse their income and expenditure across the months. 

<p align="center">
  <img width="450" height="200" src="https://github.com/jabs142/track-it/blob/main/apps/client/src/images/homepage.png?raw=true">
</p>


<br>

## 🛠 Development 

### General idea:
* Users should be able to create an account and log in 
* App should be able to verify the user
* Users should be able to navigate via navbar and log out
* Users should be able to input income and expense and have the app auto-refresh
<p align="center">
  <img width="450" height="200" src="">
</p>
* Users should be able to edit and delete their inputs 
<p align="center">
  <img width="450" height="200" src="">
</p>
* Users should be able to analyse their income and expense via charts and graphs
<p align="center">
  <img width="450" height="200" src="https://github.com/jabs142/track-it/blob/main/apps/client/src/images/overview.png?raw=true">
</p>
<br> 



### Approach:

1. We started off by creating the basic backend functionality. Making sure the routes work and then using Bcrypt to create user authentication 

2. Moving on to the front end, we created a basic UI with a navbar and a form using React which enabled us to add and list the expenses and income.

3. Next, we focused on connecting the front end to the back end. Using useEffect and fetching the backend's routes

4. After we are able to create income and expenditures on our app, we fetched the data in order to build our charts and graphs

5. Lastly, we added a settings page to change user info, updating the data on the backend as well. 



## 🎈 Future Improvements
<ol>
    <li> Create custom views/ graphs according to each user's specifications </li>
</ol>