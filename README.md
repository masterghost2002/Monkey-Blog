
# Monkey-App 🐒 (Blogging Site)

Monkey-App is a full-stack app build over MERN. 
It is basically a Blogging site with modern UI and lots of functionality.
Where user can post update delte or read other user blogs even can share them, download as pdf.\

[🔗 Monkey-App](https://monkey-app.netlify.app/)




## Features

- Light/dark mode toggle ☀️/🌚
- Add/Update Blog  ➕ ✏️

- Rich Text-Editor 🤑 ✏️
- Download Blog as PDF (BETA) 📥
- Validation Handeling (wrong password, email, OTP ..etc) ❌
- Authentication while deleting or updating blog 🗑️
- Fully Responsive
- JWT Authentication
- OTP Verfication for signup/forgotpassword. 
- Animation on scroll 🖱️
- Share blog over social media, person can view shared blog without login 🌐
- Fast, Optimised 🚀
- Modern UI 
- Loader,Spinners, Skeletion Card while fetching data. ߷ 🩻
- Good routes management 




## Tech Stack 🌐

**Front-end:** React, Redux, React-toastify,Bootstrap,React-Loader,React-Skeleton,JodithEditor,React-Lazy,Axios,AOS

**Back-end:** Node, Express,MongoDB,Mongoose


## Requirements

Install Node js 16 or above

```bash
  https://nodejs.org/en/download/
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE URI` --> YOUR DATABASE URI

`BASE_SERVER_URL` --> for localhost use http://localhost:5000



## Run Locally

Clone the project 

```bash
  git clone https://github.com/masterghost2002/Monkey-Blog
```

Go to the project directory

```bash
  cd Monkey-Blog
```

Install front-end dependencies, go to the front-end directory

```bash
  cd frontend
```

```bash
  npm install
```
Install back-end dependencies, go to the back-end directory

```bash
  cd backend
```

```bash
  npm install
```
Start the server,go to the back-end directory

```bash
  npm server.js
```
OR
```bash
  nodemon server.js
```
Start the frontend,go to the back-end directory

```bash
  npm start
```

## Screenshots Desktop

![Screenshot (97)](https://user-images.githubusercontent.com/55751461/200129949-cff124f7-0686-49fd-a565-15b0152581b5.png)
![Screenshot (98)](https://user-images.githubusercontent.com/55751461/200129952-354124ea-04c1-43cf-aa5e-2f0505084db0.png)
![Screenshot (99)](https://user-images.githubusercontent.com/55751461/200129954-fe590def-f784-486b-bf72-44b7ee016ee5.png)
![Screenshot (100)](https://user-images.githubusercontent.com/55751461/200129958-40abdf6c-7788-4dd0-b953-49082c7a590e.png)
![Screenshot (101)](https://user-images.githubusercontent.com/55751461/200129961-1187ed69-ffba-4918-aa61-bb95096397da.png)
![Screenshot (89)](https://user-images.githubusercontent.com/55751461/200129963-fd983c7d-155c-45df-9e9f-285291eefe5b.png)
![Screenshot (90)](https://user-images.githubusercontent.com/55751461/200129965-fd63f3a4-0af0-4e37-8741-8a04edc8afc1.png)
![Screenshot (91)](https://user-images.githubusercontent.com/55751461/200129977-5890f3c0-3a0a-4fdb-af96-d5766169f24b.png)
![Screenshot (92)](https://user-images.githubusercontent.com/55751461/200129986-e4351a87-c552-4dbc-b629-5160472eb43b.png)
![Screenshot (93)](https://user-images.githubusercontent.com/55751461/200129988-2f8dbed3-60e5-4906-a366-87966e8f121c.png)
![Screenshot (94)](https://user-images.githubusercontent.com/55751461/200129994-c98f5e8f-cb9e-46c1-872b-f7c0b6c22f19.png)
![Screenshot (95)](https://user-images.githubusercontent.com/55751461/200129997-fd5838aa-2a6d-4ef2-837b-8b12acaeead1.png)
![Screenshot (96)](https://user-images.githubusercontent.com/55751461/200130000-12857158-b694-4a42-bc77-fb3826f44ac3.png)
![Screenshot (111)](https://user-images.githubusercontent.com/55751461/200130945-48f972e9-0067-4aba-9faa-4b2c5557c339.png)
![Screenshot (112)](https://user-images.githubusercontent.com/55751461/200130946-bc9b7add-2082-4d27-a9fd-dbcf743b3c72.png)
![Screenshot (113)](https://user-images.githubusercontent.com/55751461/200130976-c487ae19-9523-4f5f-b650-c2947bb22f89.png)

## Screenshots Mobile

![Screenshot (106)](https://user-images.githubusercontent.com/55751461/200130990-ec34fbb8-d40b-4932-8534-52b2210b05cb.png)
![Screenshot (107)](https://user-images.githubusercontent.com/55751461/200130994-7ffb56c3-e47a-4a94-a69c-cd494342cb08.png)
![Screenshot (108)](https://user-images.githubusercontent.com/55751461/200130995-d5e5d429-c267-484f-a091-cc5a628ee60b.png)
![Screenshot (102)](https://user-images.githubusercontent.com/55751461/200130998-87e1cb14-6192-4de4-be9b-722cffd26936.png)
![Screenshot (103)](https://user-images.githubusercontent.com/55751461/200130999-91b11cad-909a-4a70-a7a4-986533cca026.png)



## NPM


### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

