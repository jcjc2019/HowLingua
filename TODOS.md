1. `Settings` user settings page: 
  - user can change userName
  - user settings page: user can change image URL
  - user can select and add another language
  - user can select and add another topic
  - after logging in, directed to user settings page: user can change password
  - when user chooses a language, add a language Id to user database
  - You have been learning a new language for `user.createdat` days.
  
2. `Learn a Character` function: add a dictionary function by using `Hanzi.js` library for user to check a character

3. survey/signin/signup forms: 
  - error messages for all forms. Shaking animation
    - signup: check if the user's email is already in the database for signup form.
    - login: check if the input is empty

4. use Redux to pass
   - surveyForm to WelcomeContainer
   - loginForm state to MainContainer
   - signupForm state to MainContainer
5. refactoring
   - move routes to a separate file