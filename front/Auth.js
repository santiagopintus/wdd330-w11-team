//Auth class which provides basic JWT based authentication for our app.
// Requires: access to the makeRequest  functions
import makeRequest from "./authHelpers.js";

/* Auth Class */
export default class Auth {
  constructor() {
    this.jwtToken = "";
    this.user = {};
  }

  async login(cb) {
    // replace the ids below with whatever you used in your form.
    const password = document.getElementById("password");
    const username = document.getElementById("username");
    const postData = {
      email: username.value,
      password: password.value,
    };
    try {
      /* Pass credential to server */
      let req = makeRequest("login", "POST", postData)
        .then((res) => {
          this.jwtToken = res.accessToken;
        })
        .finally(async () => {
          this.user = await this.getCurrentUser(username.value);
          this.validateUser(cb);
        });
    } catch (error) {
      // if there were any errors display them
      console.log(error);
    }
  }
  // uses the email of the currently logged in user to pull up the full user details for that user from the database
  async getCurrentUser(email) {
    try {
      // 3. add the code here to make a request for the user identified by email...don't forget to send the token!
      return makeRequest(`users?email=${email}`, "GET", null, this.jwtToken).then(
        (res) => res
      );
    } catch (error) {
      // if there were any errors display them
      console.log(error);
    }
  }

  validateUser(cb) {
    // let's get the user details as well and store them locally in the class
    // you can pass a query to the API by appending it on the end of the url like this: 'users?email=' + email
    if (this.user) {
      /* Hide error msg */
      this.userNotFoundError(false);
      // hide the login form.
      document.getElementById("loginContainer").classList.add("hidden");

      // clear the password
      password.value = "";

      // since we have a token let's go grab some data from the API by executing the callback if one was passed in
      if (cb) {
        cb(this.jwtToken);
      }
    } else {
      this.userNotFoundError();
    }
  }

  userNotFoundError(isError = true) {
    let textContent = "";
    if (isError) {
      textContent = "Username or password incorrect!";
    } else {
      textContent = "";
    }
    document.getElementById("formError").innerText = textContent;
  }

  // set token(value) {
  //   this.jwtToken = value;
  // }

  get token() {
    return this.jwtToken;
  }
} // end auth class
