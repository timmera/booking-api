# Express Events Starter

This repository contains starter code for the Express Events exercise. There are two two types of folders in this repository: `starter` and `solution`. `starter` only contains boilerplate code for the given course exercise, while `solution` contains the entire code that solves the given problem.

## How to get started

Sometimes in the course, we might suggest you to download the "starter" code as a ZIP file. There is always an option to get started right from this repo though. You can either fork, or download this repository, and create your own solution as a root-level folder. This way, you have continuous access to the solution.

However, we recommend you to try solving the exercises as independently as possible - you will find very similar code in the course contents, which you can also use as reference.

## Starting the App

To start the app, follow these steps:

1. Create a `.env` file in the root directory of the `starter` or `solution` folder.
2. Replace the values for `AUTH_SECRET_KEY` and `SENTRY_DSN` with your own values.

```plaintext
AUTH_SECRET_KEY=your_secret_key_here
SENTRY_DSN=your_sentry_dsn_here
```

## Running tests

Tests are created using Newman, a command-line tool that is able to automate execution of Postman-created tests. Therefore, this command will simulate more or less the same tests that we executed during the course (e.g. test if the "happy case" returns 200 or 201 status code, or it returns 404 Not found when we are requesting a non-existing ID).

To run the tests, perform the following steps:

1. Start the server. This can usually be done by running `npm run dev` in the folder you want to test.
2. Go to `postman/environments` folder in the repo. It has a content like this:

```json
{
  "id": "f1936dc5-a5da-47d7-8189-045437f96e9e",
  "name": "Local",
  "values": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000",
      "type": "default",
      "enabled": true
    }
  ],
  "_postman_variable_scope": "environment",
  "_postman_exported_at": "2023-08-11T05:55:13.469Z",
  "_postman_exported_using": "Postman/10.16.9"
}
```

3. If you server is running on a diferent port or URL, change the value `http://localhost:3000` to your server's data (this is the default one though).
4. Run the following command

```plaintext
npm test
```

After this, you will see the test results prompted to the terminal. If you have a look at the `package.json` file, you will see that it executes the collection stored in the `postman` folder of the repo root.

Important: When dealing with JSON data, please, make sure that you restart the server with `npm run dev` every time you execute tests! This is important because some tests will remove data via DELETE endpoints and that operation cannot be repeated with the same ID again and again.
