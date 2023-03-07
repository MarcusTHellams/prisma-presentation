

# Welcome to the Prisma Presentation

To get started in your terminal navigate to the prisma-presentation folder wherever you downloaed it and run:

`yarn`

Next you need to copy the .*env.template* file and rename it to *.env*

You will need to update the *DATABASE_URL* field to a value provided to you by Marcus which is a cloud based postgresql database.

Next run:

`yarn prisma:generate`

In another terminal run

`yarn studio`

This will open up <a href="https://www.prisma.io/studio" target="_blank">Prisma Studio</a> in your default browser. Here you can interact with the postgresql database through a browser based GUI

Go back to your original terminal. If there is no data already in the database  run

`yarn seed`

As the name says this will seed the database.

Now run:

`yarn start`

This will start a CLI allowing you to run different commands on the data base.

Ex:
```javascript
❯ Get Users
  Update User
  Add User
  Delete User
```
User the up and down arrow keys to choose which action you would like to take and then press `enter` or `return`


See the following file for the code that the above commands run:
*src/users.ts*