# Members Only

## Members Only - Overview

This is the forth project of the "NodeJS" course within "The Odin Project".

This project is used to practice authentication with PassportJS.

In particular, this project aims to create a message board application that requires a user to login in order to create messages and view certain details about other users' messages.

**You can view this project at: https://dantes-membersonly.up.railway.app/**

## Usage

### Creating an Account

When you first enter the website you should see a number of messages with a redacted author and creation date.

In order for you to view these details and create messages yourself you will need to login.

You can press the login button (at the footer) to login.

If you don't have an account, you can sign-up.

A link to the sign-up form can be found within the login form.

### Becoming a Member

After logging-in you won't see any significant change.

That is because you're not authorized as a member.

In the homepage, in-place of the login button, you should see a key button.

Click the button to navigate to the member authorization form.

Enter the key: 'SecretMemberKey' and submit the form.

You will now be able to create messages, and view other members' message details.

### Admin Users

Although you're able to delete your own messages, you're not able to delete other members' messages.

That is because the aforementioned action is an admin-restricted action.

If you have the admin key, when you create a message, you should see a link directing you to the authorization page.

This page is identical to the page you used to receive authorization as a member.

If you enter the correct admin key here you will be authorized as an admin.

As an admin, you're able to perform all the actions a member can perform and delete any message.

## Skills Demonstrated

- Authentication

- PassportJS

- PassportJS "passport-local" strategy

- Sessions

- express-session

- Storing sessions in PostgreSQL with connect-pg-simple

- Storing passwords

- Hashing and comparing passwords with bcrypt.js
