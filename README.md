### node-password-manager
Password Manager built on NodeJS

-----

Very simple node js application that manages passwords locally. This application utilizes: 

* [crypto](https://nodejs.org/api/crypto.html) - for encrypting and decrypting username and passwords
* [node-persist](https://github.com/simonlast/node-persist) - for persisting data to your computer
* [yargs](http://yargs.js.org/) - for easy variables in the command line

-----

How to run:

1.  ```npm install```
2.  Add an account by running: ```npm start -- create```

    There are three required flags: ```-n (name of act.) -u (username) -p (act password) -m (master password)```
    
    Example: ```npm start -- create -n twitter -u twitterUserMax -p twitterPass -m iLoveCats123```
    
    Your Master Password is used to encrypt all of your data and will be the same across all of your accounts.
    
3. To fetch an account, run: ```npm start -- get```

    This command requires two flags: ```-n (name of act.) -m (master password)```
    
    Example: ```npm start -- get -n twitter -m iLoveCats123```
    
4.  For help, including a list of all variables and commands run:

    ```npm start -- create -help```
    
    ```npm start -- get -help```
