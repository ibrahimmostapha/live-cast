# ESA Final Project

## What is this

A subsciption-based Web Application that allows users easy access to watch broadcasts online

## Requirements

Node.js is required to be installed on the client device

## Technologies

This App was made using the MERN stack technology

### Backend

The backend consists of a [Node.js](https://github.com/nodejs/node) API using [Express.js](https://github.com/expressjs/express) and a [MongoDB](https://github.com/mongodb/mongo) database

### Frontend

The frontend was made with [Vite](https://github.com/vitejs/vite) using [React.js](https://github.com/facebook/react)

## How to get the project running

### Installing the source code

Clone this repository to your client 

### Installing npm dependencies

Run `npm install` on the root directory as well as the ./client/ directory to install all npm dependancies

### Setting up the environment 

 Create a `.env` file in the root directory containing the following information:

- DB_URI=[DB connection string]
- PORT=[Port for the node server]
- STRIPE_KEY=[Stripe key]
- WEBHOOK_SECRET=[Stripe webhook secret]
- SECRET=[Encryption secret for bcrypt]

### Running the app

1. Open a terminal in the root directory
2. Run `node server/index.js`
3. Open another terminal simultaneously
4. Navigate to ./client/ directory
5. Run `npm run dev`

## Configuration

The module has no menu or modifiable settings. There is no configuration. When
enabled, the module will prevent the links from appearing. To get the links
back, disable the module and clear caches.