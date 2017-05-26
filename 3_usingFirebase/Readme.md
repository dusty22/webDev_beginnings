Background information:
Firebase is a server/platform by Google that allows you to connect your coding 
projects and apps to the web.

It has a lot of uses, but we are using it as a "database", something that clients 
can connect to and read shared (server-side) values from.

Another use we may explore later on is using it for "hosting" as a server 
that "serves" you the HTML/CSS/Javascript files that you see as the web page 
(right now we are using Cloud9 for this when we run our HTML files).


Your tasks:
1. Set up a Firebase account here: https://firebase.google.com/

2. Go to your Firebase console, and create a new project called Firebase_Communicator,
   and click "Add Firebase to your Web app."

3. Some information should pop up. Change the Firebase information in 
   firebase_communicator.html so it connects to your own personal Firebase database 
   using the information. If you still can't connect to it, change the authentication
   rules for your Firebase project.

4. Fix the missing code in firebase_communicator.html.

5. Run the the HTML file and play around with the database on your project's console
   page and see if you can retrieve and set values using the Communicator web page.

Extra credit:
- add a table that displays the rows in the database in a similar fashion to 
  what you see when you look at the database with your project's Firebase console.

- host the page using Firebase instead of Cloud9 (see "https://github.com/vipud/cloudcryptowiki/wiki/firebase")
