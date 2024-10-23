<div align="center">
  
  <h2>VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY</h2>
  <h3>UNIVERSITY OF TECHNOLOGY</h3>
  <h3>FACULTY OF COMPUTER SCIENCE AND ENGINEERING</h3>
  
  <br />
  
  <img src="https://hcmut.edu.vn/img/nhanDienThuongHieu/01_logobachkhoasang.png" alt="logo" style="width: 350px; height: auto;">
  
  <br />
  <br />

</div>

<h2 align="center">💡 Project: Title Later Added 💡</h2>

---

<h2 align="center">⚒️ Languages-Frameworks-Tools ⚒️</h2>

<div align="center">
  <img src="https://skillicons.dev/icons?i=html,css,javascript,vite,react,nodejs,vscode,github,git,md" alt="Tools and Languages" />
</div>

---

<!-- <h2 align="center">📂 Dataset Links for Kaggle Notebooks 📂</h2>

<div align="center">
  <a href="https://www.kaggle.com/datasets/zphudzz/dath-pdz">Dataset 1: final_dataset_v1_afternb1.csv</a><br />
  <a href="https://www.kaggle.com/datasets/zphudzz/pdz-dath-ds">Dataset 2: output_w2v.txt</a>
</div> -->

<!-- <h2 align="center">💾 File Structure for Local Work 💾</h2>

<div align="center">
  If you want to download the datasets to work locally, here's the suggested way to arrange the files:
  <br /><br />
  <img src="Capture.PNG" alt="File Structure" style="width: 350px; height: auto;">
</div> -->

# SSPS_HCMUT - Code
## Description
This repository contains the code for a Student Smart Printing Service. The code is organized as follows:

- frontend: This folder contains the source code for the front-end web application, which is built with React. The src folder includes the following subfolders and files:
  - assets: This folder contains images, icons, fonts and other static files used by the web app.
  - components: This folder contains reusable React components.
  - pages: This folder contains the React components for each page of the web app.
  - slices: This folder contains the Redux slices for managing the state of the web app.
  - main.jsx: This file is the entry point of the web app, which renders the App component and sets up the Redux store and router.
- backend: This folder will contain the source code for the back-end server, which will handle the communication with the - printers and the database. The folder includes the following subfolders and files:
  - config: This folder contains configuration files for the server. It includes db.js, which is used to configure the database connection.
  - controllers: This folder contains the logic for handling different routes. Each controller corresponds to a specific route and contains the logic for handling requests to that route.
  - data: This folder contains any static data or files that the server needs to use.
  - middlewares: This folder contains middleware functions that are used to process requests before they reach the controllers.
  - models: This folder contains the data models for the application. These models define the structure of the data in the database.
  - routes: This folder contains the route definitions for the server. Each file in this folder corresponds to a different endpoint on the server.
  - server.js: This is the entry point for the server. It sets up the server, connects to the database, and starts listening for requests.


## Instruction
### Prerequisites
- NodeJS v18.13.0 or higher
- npm v8.19.3 or higher
#### Check your version with
```
node --version
npm --version
```

### Usage
Do the following steps: 
#### Setup database
- You can replace our MongoDB URI with your own in .env file. 
#### Install Dependencies
- Make sure you are in /code folder.
```
npm install
cd frontend
npm install
```
#### Seed Database
- Make sure you are in /code folder.
- Use the following commands to seed the database with sample printers and configuration data.
```
# Import data
npm run data:import
```
#### Run
- Make sure you are in /code folder.
```
npm run dev
```
#### Login
- At the login screen, select the role you want to login as, either Customer or SPSO.
- Login with a hcmut email account.
- **Note that only one role can be assigned to each mail**. You'll need two hcmut email accounts to test two different roles.

---

<h2 align="center">💟 Contributors 💟</h2>

<div align="center">
  <a href="https://github.com/pdz1804"><img src="https://avatars.githubusercontent.com/u/123137268?v=4" title="pdz1804" width="50" height="50"></a>
  <a href="https://github.com/Frankie2030"><img src="https://avatars.githubusercontent.com/u/144931593?v=4" title="Frankie2030" width="50" height="50"></a>
</div>
