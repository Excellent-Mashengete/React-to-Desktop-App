# Project Setup Guide

This project contains two frontend applications: `electron_frontend` and `react_frontend`. Follow the instructions below to run each application.

---

## 1. Running `react_frontend` (Web)

1. **Navigate to the directory:**
    ```
    cd react_frontend
    ```
    

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Start the React app:**
    ```
    npm start
    ```
    The app will be available at [http://localhost:8080](http://localhost:8080).

---

## 2. Running `electron_frontend` (Desktop)

1. **Navigate to the Electron directory and install dependencies:**
    ```
    cd electron_frontend
    npm install
    ```

2. **Return to the React frontend directory:**
    ```
    cd ../react_frontend
    ```

3. **Build the React app:**
    ```
    npm run build
    ```

4. **Start Electron using the React build:**
    ```
    npm run electron
    ```
    This will launch the Electron application window using the React build files.

---

dotnet ef migrations add InitialCreate --project Employee.Data --startup-project Employee.Server 
dotnet ef database update --project Employee.Data --startup-project Employee.Server
## Notes

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Run each frontend in a separate terminal window if you want both running simultaneously.
- The Electron app depends on the React build output, so always build React before starting Electron.