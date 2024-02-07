# Hospital Simulator

## Overview

The Hospital Simulator is a coding challenge project that simulates the future patients' state based on their current state and a list of drugs they take. The project is divided into two main parts: a library (`hospital-lib`) that implements the core logic of the problem, and a user interface (`hospital-fe`) that uses this library.

## Tech Stack

The project is built using a variety of technologies:

- **TypeScript**: The core logic of the application is written in TypeScript. This provides static type checking, which can help catch errors early during the development process. It also provides better tooling with autocompletion, type inference, and more.

- **Vue.js**: The frontend of the application is built using Vue.js. Vue.js is a progressive JavaScript framework for building user interfaces. It is easy to pick up and integrate with existing projects.

- **Nuxt.js**: Nuxt.js is used to create a robust, performant application. It provides features like server-side rendering, static site generation, automatic code splitting, and more.

- **Node.js**: The backend server (`hospital-be`) is built using Node.js. Node.js is a JavaScript runtime that allows you to run JavaScript on your server.

- **Vite**: Vite is used as the build tool/bundler for the project. It provides a faster and leaner development experience for modern web projects. It offers features like hot module replacement and esbuild powered fast bundling.

## Libraries

- **hospital-lib**: This is the core library that implements the logic for simulating the future state of patients based on their current state and the drugs they take. It is written in TypeScript and provides a `Quarantine` class with methods for setting drugs, waiting for a period, and reporting the current state of patients.

- **pinia**: Pinia is used for state management in the Vue.js application. It provides an intuitive API and improves the developer experience by offering devtools support, TypeScript integration, and more.

## Nuxt.js API

Nuxt.js is used in the project to provide a framework for building the Vue.js application. It provides features like automatic routing, server-side rendering, static site generation, and more. 

More importantly it allows to deploy the full stack on Vercel with a single push.
It replace the need of a separate backend server (hospital-be).
## Running the Project

To run the project, you need to install the dependencies and start the server and the frontend application. You can do this by running the following commands in the root directory of the project:

```bash
# Install dependencies
pnpm install

# (optional) set .env variable in Nuxt as in .env.example if you want to test express server
# if not set it will use Nuxt API route to fetch data
# (optional) Start the backend server
pnpm run start:be

# Start the frontend application
pnpm run start:fe
```

Please note that you need to have `pnpm` installed on your machine to run these commands. If you don't have it, you can install it by running `npm install -g pnpm`.

## Improvements areas

The Hospital Simulator project has been developed with a robust tech stack and provides a good foundation for future enhancements. Here are some improvements that could be made in future iterations:

1. **Enhanced diagnose system**: The current system allows for the combination of two drugs. This could be expanded to allow for more complex drug combinations. This would involve updating the `Quarantine` class in the `hospital-lib` to handle more complex interactions and possibly adverse effects.

2. **Configurable parameters**: The user interface could be enhanced to allow users to manually set some parameters. This could include the length of the quarantine, the maximum number of drug combinations, and an auto-refresh feature. This would involve updating the `useScenarioStore` in the `scenario.ts` file and the corresponding UI components.

3. **User profiles**: The application could support user profiles, allowing different users to have their own set of patients and drug combinations. This would involve adding authentication and user management to the application.

4. **Advanced reporting**: The reporting feature could be enhanced to provide more detailed reports, including trends over time, the effectiveness of different drug combinations, and more.

5. **Automated testing**: While the `hospital-lib` has a test suite, automated tests could be added for the frontend application to ensure that all components are working as expected.

6. **Database Integration**: The application could be enhanced by integrating a database like PostgreSQL or MySQL. This would allow for persistent storage of simulation results, which could then be used for analytics and trend analysis. It would also provide a more secure way of storing data, as databases have built-in mechanisms for data protection and access control. This would involve setting up a database, creating the necessary tables, and updating the application to read from and write to the database instead of using local storage. This could also pave the way for more advanced features, such as user accounts and personalized histories.

7. **Error handling**: The application could be enhanced by adding more robust error handling. This could involve adding error boundaries to the frontend application, adding error logging to the backend server, and more.

8. **Better typing**: The application could be enhanced by enhancing the typesafety of the application. This could involve adding more types to the application, using more advanced TypeScript features, and more.

These improvements would make the Hospital Simulator more flexible, user-friendly, and robust, enhancing the overall user experience and the application's usefulness in a real-world scenario.

