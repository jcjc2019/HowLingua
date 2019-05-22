1. user settings page: 
  - user can change userName
  - user settings page: user can change image URL
  - after logging in, directed to user settings page: user can change password
  - when user chooses a language, add a language Id to user database
  - You have been learning a new language for `user.createdat` days.
  
2. `Learn a Character` function: add a dictionary function by using `Hanzi.js` library for user to check a character

3. survey/signin/signup forms: 
  - `handleSubmit` not yet done. shall i use react router or conditional rendering?
  - error messages for all forms.

4. use Redux to pass
   - surveyForm to WelcomeContainer
   - loginForm state to MainContainer
   - signupForm state to MainContainer

5. `Drawer`
  - If user is logged in, render logout on the left, add username on the left. TODO
  - If user is not logged in, render login on the left. TODO