# **MERN Stack App for Credential Management**

## **Description**
This web application is a robust solution developed on the MERN stack (MongoDB, Express, React, and Node), tailored to streamline user credential management for Cool Tech, an imaginative tech company.

Within this platform, individuals, including employees, have the ability to either log in to their accounts or register as new users. This grants them the power to seamlessly execute a wide range of operations, such as creating, viewing, and updating credential repositories. Furthermore, users can dynamically assign or revoke user access to specific Organizational Units and Divisions stored in the database, all based on their respective roles and responsibilities.

### **Database Info** ###
The cool_tech database consists of the following collections: 
1. **organisationalunits**
    * Within this dataset, you will find information pertaining to Cool Tech's four distinct Organizational Units (OUs).
    * Each OU boasts a minimum of 10 unique Divisions nested within it, with each Division maintaining its own Credentials Repository. This repository houses login credentials for various locations within the respective Division.
    * Every OU contains a roster of users, specifically employees, who are assigned to that OU. Likewise, each Division within an OU also has its own list of assigned users.
    * Users have the flexibility to be assigned to an OU without necessitating assignment to any of the Divisions within that OU. However, to be assigned to a Division, they must first be assigned to the parent OU. In practice, this means that users assigned solely to an OU can access the OU but not its individual Divisions. Conversely, when a user is assigned to both an OU and one of its Divisions, they gain access not only to the OU and Division but also to the Credentials Repository associated with that Division.
    * While the majority of employees are typically associated with just one OU and one of its respective Divisions, there are instances where certain employees hold roles that require membership in multiple OUs and Divisions simultaneously. These assignments are contingent upon their roles within the company.

2. **users**
    1. User Authentication and Registration:
        * New users are automatically registered with a default "Normal" role.
        * The user's role determines the content displayed on their dashboard, ensuring they only see what they have access to.
    2. Display Assigned Entities:
        * Show all Organizational Units (OUs), Divisions, and Credential Repositories assigned to the user.
    3. Add New Credentials:
        * Users with "Normal," "Management," and "Admin" roles can add new credentials to a Credential Repository.
    4. Update Existing Credentials:
        * Users with "Management" and "Admin" roles have the capability to update existing credentials within a Credential Repository.
    5. Assign and Unassign Users (Admin):
        * Administrators can assign or unassign users to/from Organizational Units (OUs) and Divisions.
        * When a user is unassigned from an OU, they are also removed from all associated Divisions.
    6. Change User Roles (Admin):
        * Administrators possess the authority to modify user roles, adjusting them as needed.

### **Authentication & CRUD Operations** ###
* The app uses JWT authentication tokens in order to authenticate requests made by clients such as browsers.
    1. User Authentication and Registration:
        * New users are automatically registered with a default "Normal" role.
        * User role authentication governs dashboard content, ensuring access to relevant information.
    2. Display Assigned Entities:
        * Present all Organizational Units (OUs), Divisions, and Credential Repositories assigned to the user.
    3. Add New Credentials:
        * Users with "Normal," "Management," and "Admin" roles can create new credentials in Credential Repositories.
    4. Update Existing Credentials:
        * Users with "Management" and "Admin" roles possess the capability to edit existing credentials within Credential Repositories.
    5. Assign and Unassign Users (Admin):
        * Administrators can manage user assignments to OUs and Divisions, enabling assignment and unassignment.
        * When unassigned from an OU, users are concurrently removed from its associated Divisions.
    6. Modify User Roles (Admin):
        * Administrators are authorized to adjust user roles as necessary.

## What's happening in the back-end (Node.js/Express/MongoDB/Mongoose)?
* The server.js file, accessible at /server/server.js, serves as the central hub for managing URL paths related to authentication and CRUD operations. It relies on callback functions from two essential files:

1. organisationalUnit.controller.js: This file contains functions responsible for handling Organizational Unit-related operations.
2. user.controller.js: This file houses functions responsible for managing authentication and performing CRUD operations on the database in relation to users.

* These controller files, in turn, rely on data models and schemas provided by three key files:
1. user.js: This file defines the data structure and schema for user-related information.
2. organisationalUnit.js: This file specifies the data structure and schema for Organizational Unit data.
3. newCredential.js: This file outlines the data structure and schema for new credentials.

* This structured approach ensures that the server.js file remains clean and organized while leveraging modular components for various functionalities.

## What's happening in the front-end (React)?
* The front-end logic for managing data retrieval from the backend and displaying content based on user authentication and request parameters is encapsulated within the following components:

1. App.js: This central file orchestrates the front-end operations, including the storage of data from the backend in state and dynamically rendering content. It acts as the main hub for user interactions and data presentation.
2. Components: A collection of component files residing within this directory contribute to the overall front-end functionality. These components facilitate user inputs for CRUD (Create, Read, Update, Delete) operations and subsequently transmit this data to the backend for database updates.

* Together, these elements form a cohesive front-end structure that seamlessly interacts with the backend, enabling efficient data management and user-driven actions.

## **Installation and Setup**
1. Begin by cloning the repository to your local machine. You can use your preferred Integrated Development Environment (IDE), for example, Visual Studio Code.
2. In the command line, navigate to the *server* folder and install the dependencies: `npm install`
3. Open a new/split terminal window and navigate to the *client* folder and install the dependencies: `npm install`
4. In the *server* folder, run the project's server: `npm start`
5. In the *client* folder, run the project's server: `npm start`
6. This should open the React app in your browser automatically, alternatively navigate to http://localhost:3000/

**Note:**
* This app uses an *.env* file to protect sensitive data. You'll need to set up and create your own connections and JWT in your MongoDB database and replace the ones in this project with your own.

<hr>

## **User Dashboard Functionality:**

1. Login or Register a New User:
* Begin by logging in or registering a new user.
* Once logged in, the dashboard will dynamically display Organizational Units (OUs) and Divisions accessible to the user, granting CRUD permissions based on the user's role.

2. OU Cards (Left Column):
* Overview Tab:
    * Click the Overview tab to view detailed information about OUs and Divisions.
* Credential Repos Tab:
    * Access this tab to:
        * View credentials.
        * Add new credentials by clicking the respective button in the tables.
        * Edit credentials by clicking the respective button in the tables and completing the displayed form.
* OU Users and Division Users Tabs:
    * In these tabs:
        * Unassign users by clicking the respective buttons in the tables.
3. Users Cards (Right Column):
* Users List Tab:
    * View the list of users available.
* Manage Users Tab:
    * Utilize this tab to:
        * Change user roles by selecting options from the dropdown menu.
        * Assign users to OUs and Divisions by completing the form in the dropdown menu.

## **Credit and References**
**Project:** IFS L4T35: Authentication
**Created by:** [Clerise Swart](https://github.com/cleriseswart)
**Technologies Used:** HTML, CSS, JavaScript, Node.js, Express, MongoDB
**OU and Division Breakdown:** For a detailed breakdown of Organizational Units (OUs) and Divisions used in this project, refer to the [populate.txt](/populate.txt) file located in the root directory.

**Acknowledgments:**
- Special thank you to my mentor LH. for his guidance and support throughout this boot camp, I am forever grateful to you for your dedication and helping me achieve my dreams!
