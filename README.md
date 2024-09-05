
# **TaskMaster**

<div align="center">
  <video width="720" height="400" controls>
    <source src="./TaskMaster.mp4" type="video/mp4">
  </video>
</div>

---

## **Overview**
**TaskMaster** is a project management tool designed to help teams collaborate efficiently. The app offers both frontend and backend functionality, with a seamless user experience and an intuitive interface. This README provides the necessary steps for installing, running, and configuring the application.

---

## **Table of Contents**
1. [Features](#features)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
    - [Frontend](#frontend)
    - [Backend](#backend)
4. [IP Configuration](#ip-configuration)
5. [Troubleshooting](#troubleshooting)
6. [License](#license)

---

## **Features**
- Simple task creation and management
- Real-time collaboration
- Easy-to-use frontend with a responsive design
- Backend server for managing user data and tasks

---

## **Installation**

Before running the application, make sure you have the following installed on your system:
- Node.js
- NPM (Node Package Manager)

### **1. Cloning the Repository**
To get started, clone the repository to your local machine:
```bash
git clone https://github.com/your-username/taskmaster.git
cd taskmaster
```

---

## **Running the Application**

### **Frontend**

1. Open your terminal and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

The frontend will be served at `http://localhost:3000/` by default.

### **Backend**

1. In your terminal, navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2. Install the necessary dependencies:
    ```bash
    npm install
    ```

3. Start the backend server:
    ```bash
    node server.js
    ```

The backend will typically run on `http://localhost:5000/`.

---

## **IP Configuration**

Since the application might be running on a dynamic IP due to Wi-Fi usage, you need to ensure that the correct IP address is used by the frontend to communicate with the backend.

1. **Check your system’s IP address**:
    - On Windows, open `cmd` and run:
    ```bash
    ipconfig
    ```

2. **Update the `.env` file** in the `frontend` directory with the correct IP address for your backend server:
    ```bash
    REACT_APP_BACKEND_URL=http://<your-ip-address>:5000
    ```

Make sure to replace `<your-ip-address>` with the correct IP.

---

## **Troubleshooting**

- **Issue**: Frontend is not loading after running `npm start`.
  - **Solution**: Ensure all dependencies are installed correctly with `npm install` and that you are using the correct version of Node.js.

- **Issue**: Backend server is not responding.
  - **Solution**: Check that the server is running on the correct port (`5000` by default) and ensure the IP address in the `.env` file is up-to-date.

- **Issue**: IP address changes frequently.
  - **Solution**: You can either set a static IP address on your network or manually update the IP in the `.env` file each time before running the app.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
