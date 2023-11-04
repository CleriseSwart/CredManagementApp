import React, { useState, useEffect } from 'react';

// Import Bootstrap components.
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

export default function UsersCard({ ouData, setOuData, userData, allUsersData, setAllUsersData }) {
    // Set States
    // For selected User 
    const [selectedUserName, setSelectedUserName] = useState();
    const [selectedRole, setSelectedRole] = useState();

    // For selected OU and Div
    const [selectedOU, setSelectedOU] = useState();
    const [selectedDivision, setSelectedDivision] = useState();

    // Displaying error/success
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    // User Token 
    // Store token
    const userToken = userData.token;

    // Use Effect 
    // Admin user
    useEffect(() => {
        const getAllUsers = async () => {
            // Store role
            const userRole = ouData.role;

            // Admin user
            if (userRole === 'admin') {
                // GET User request
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: userToken
                    }
                }
                // GET Users request to endpoint
                const response = await fetch('/users', requestOptions);

                //  Store JSON data
                const jsonData = await response.json();

                // Response error - set error state to jsonData
                if (!response.ok) {
                    setError(jsonData);
                }

                // No response error - set error state to null and allUsersData to usersData
                if (response.ok) {
                    setError(null);
                    setAllUsersData(jsonData.usersData);
                }
            }
        }
        getAllUsers();
    }, [ouData.role, setAllUsersData, userToken])

    // Handle Error/Success Messages
    // Hide error message
    const handleHideError = () => {
        setError(null);
    }
    // Hide success message 
    const handleHideSuccess = () => {
        setSuccess(null);
    }

    // Handle Change Role 
    // Updates the selected users role 
    const handleChangeRole = async (e) => {
        e.preventDefault();

        // Store selected user data
        const selectedUserData = { selectedUserName, selectedRole };

        // PUT User Roles request
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedUserData)
        };

        // PUT User Roles request to endpoint
        const response = await fetch(`/change-user-role`, requestOptions);

        // Store JSON data
        const jsonData = await response.json();

        // Fetch request error - set error state to jsonData
        if (!response.ok) {
            setError(jsonData);
        }

        // Fetch request with no error
        if (response.ok) {
            // jsonData successKey is false
            if (!jsonData.successKey) {
                // Reset states 
                setSelectedUserName('');
                setSelectedRole('');

                // Set success key to null.
                setSuccess(null);
                // Set error to jsonData error message
                setError(jsonData.message);

                // Set timeout for error message
                setTimeout(() => {
                    setError(null)
                }, 3000);

            } else {
                // if the successKey is true
                setSelectedUserName('');
                setSelectedRole('');

                // Reset error state
                setError(null);

                // GET Users request
                const getUsersRequestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: userToken
                    }
                }

                // Reset all users data 
                const usersResponse = await fetch('/users', getUsersRequestOptions);
                const usersJsonData = await usersResponse.json();
                setAllUsersData(usersJsonData.usersData);

                // GET OU Data request
                const getOUsRequestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: userToken
                    }
                }
                // Fetch OU data again 
                const ouResponse = await fetch('/organisational-units', getOUsRequestOptions);
                const ouJsonData = await ouResponse.json();
                setOuData(ouJsonData);

                // Set success state
                setSuccess(jsonData.message);

                // Set timeout 
                setTimeout(() => {
                    setSuccess(null)
                }, 3000);
            }
        }
    }

    // Handle Assign User to OU and Division 
    // Assign selected user to OU and/or Division 
    const handleAssignOU = async (e) => {
        e.preventDefault();

        // Store selected OU data
        const assignOuData = { selectedUserName, selectedOU, selectedDivision };

        // PUT Assign User request
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignOuData)
        };

        // PUT Assign User request to endpoint
        const response = await fetch(`/assign-user`, requestOptions);

        // Store JSON data
        const jsonData = await response.json();

        // Fetch request error - set error state to jsonData
        if (!response.ok) {
            setError(jsonData);
        }

        // No fetch request error
        if (response.ok) {
            // If the jsonData successKey is false
            if (!jsonData.successKey) {
                // Reset states 
                setSelectedUserName('');
                setSelectedOU('');
                setSelectedDivision('');

                // Reset success key to null
                setSuccess(null);

                // jsonData's error message
                setError(jsonData.message);

                // Set timeout
                setTimeout(() => {
                    setError(null)
                }, 3000);

            } else {
                // If the successKey is true
                setSelectedUserName('');
                setSelectedOU('');
                setSelectedDivision('');

                // Reset error 
                setError(null);

                // GET Users request
                const getUsersRequestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: userToken
                    }
                }

                // Set all usersData
                const usersResponse = await fetch('/users', getUsersRequestOptions);
                const usersJsonData = await usersResponse.json();
                setAllUsersData(usersJsonData.usersData);

                // GET ouData request
                const getOUsRequestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: userToken
                    }
                }
                // Set all ouData 
                const ouResponse = await fetch('/organisational-units', getOUsRequestOptions);
                const ouJsonData = await ouResponse.json();
                setOuData(ouJsonData);

                // Set success state 
                setSuccess(jsonData.message);

                // Set timeout 
                setTimeout(() => {
                    setSuccess(null)
                }, 3000);
            }
        }
    }

    // User is admin
    if (allUsersData && ouData.role === 'admin') {
        return (
            <Card className="my-4 ms-3 me-4">
                <Tabs defaultActiveKey="usersList" className="tabs">
                    {/* Users List Tab */}
                    <Tab eventKey="usersList" title="Users List" >
                        <Card.Body className="usersDetails">
                            {/* Card headers */}
                            <Card.Title>All Users</Card.Title>
                            <Card.Subtitle className="py-3 text-center">
                                Users are listed by role. Select role dropdown to view users.
                            </Card.Subtitle>

                            {/* Accordion for listing users by role */}
                            <Accordion key="0">

                                {/* List Admin Users */}
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Admin Users</Accordion.Header>
                                    {/* Admin Users table */}
                                    <Accordion.Body>
                                        <Table striped bordered hover className="usersTable" >
                                            <thead>
                                                <tr className="text-center">
                                                    <th>Username</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allUsersData.adminUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{user.role}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* List Management Users */}
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Management Users</Accordion.Header>
                                    {/* Management Users table */}
                                    <Accordion.Body>
                                        <Table striped bordered hover className="usersTable" >
                                            <thead >
                                                <tr className="text-center">
                                                    <th>Username</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allUsersData.managementUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{user.role}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* List Normal Users */}
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Normal Users</Accordion.Header>
                                    {/* Normal Users table */}
                                    <Accordion.Body>
                                        <Table striped bordered hover className="usersTable align-middle" >
                                            <thead >
                                                <tr className="text-center">
                                                    <th>Username</th>
                                                    <th>Role</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allUsersData.normalUsers.map((user, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{user.role}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Tab>

                    {/* Manage Users Tab */}
                    <Tab eventKey="manageUsers" title="Manage Users" className="manageUsersTab">
                        <Card.Body className="usersDetails">
                            <Card.Title>Manage Users</Card.Title>

                            {/* Assigning users to OUs and Divisions */}
                            <Accordion key="0">
                                {/* Update User Roles */}
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Change User Role</Accordion.Header>
                                    <Accordion.Body>
                                        {/* Instructions to user */}
                                        <p className="py-3 text-center manageUserFormInstructions">
                                            Select the user whose role you want to change, then select the role you want to
                                            assign to them.
                                        </p>

                                        {/* Update Roles Form */}
                                        <Form onSubmit={handleChangeRole} className="changeRoleForm mx-auto" >
                                            {/* Form Group 1: Select User */}
                                            <Form.Group as={Row} className="mb-3" controlId="formUser">
                                                <Form.Label column sm={5}>Username:</Form.Label>
                                                <Col sm={7}>
                                                    <Form.Select
                                                        value={selectedUserName}
                                                        onChange={e => setSelectedUserName(e.target.value)}
                                                    >
                                                        <option>Select user...</option>
                                                        {/* Map through normalUsers to display them in the dropdown */}
                                                        {allUsersData.normalUsers.map((normalUser, normalUserIndex) => {
                                                            return (
                                                                <option value={normalUser.username} key={normalUserIndex}>
                                                                    {normalUser.username} - {normalUser.role} user
                                                                </option>
                                                            )

                                                        })}

                                                        {/* Map through managementUsers to display them in the dropdown */}
                                                        {allUsersData.managementUsers.map((managementUser, managementUserIndex) => {
                                                            return (
                                                                <option value={managementUser.username} key={managementUserIndex}>
                                                                    {managementUser.username} - {managementUser.role} user
                                                                </option>
                                                            )
                                                        })}

                                                        {/* Map through adminUsers to display them in the dropdown */}
                                                        {allUsersData.adminUsers.map((adminUser, adminUserIndex) => {
                                                            return (
                                                                <option value={adminUser.username} key={adminUserIndex}>
                                                                    {adminUser.username} - {adminUser.role} user
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>

                                            {/* Form Group 2: Select New Role */}
                                            <Form.Group as={Row} className="mb-3" controlId="formUser">
                                                <Form.Label column sm={5}>Change Role:</Form.Label>
                                                <Col sm={7}>
                                                    <Form.Select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                                                        <option>Select new role...</option>
                                                        <option value="normal" >Normal</option>
                                                        <option value="management" >Management</option>
                                                        <option value="admin">Admin</option>
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>

                                            {/* Form Group 3: Submit button */}
                                            <Form.Group as={Row} >
                                                <Col sm={{ span: 12 }}>
                                                    <Button type="submit" className="my-4">Update user role</Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>

                                        {/* When error state is true, display error message */}
                                        {error &&
                                            <Container className="error border border-danger border-2">
                                                <Row>
                                                    <Col className="text-end">
                                                        <p className="closeMessageButton" onClick={handleHideError}>close</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p> {error}</p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        }

                                        {/* When success state is true, display success message */}
                                        {success &&
                                            <Container className="success border border-success border-2">
                                                <Row>
                                                    <Col className="text-end">
                                                        <p className="closeMessageButton" onClick={handleHideSuccess}>close</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p> {success}</p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>

                                {/* (2) Assign Users to OUs and Divisions */}
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Assign Users to OUs and Divisions</Accordion.Header>
                                    <Accordion.Body>
                                        {/* Instructions to user */}
                                        <p className="py-3 text-center manageUserFormInstructions">
                                            Select the user you wish to assign, then select the OU name and Division you want them assigned to.
                                            If you do not want to assign this user to a division, select 'none' in the Division dropdown.
                                        </p>
                                        {/* Assign Users to OUs and Divisions Form */}
                                        <Form onSubmit={handleAssignOU} className="changeRoleForm mx-auto" >
                                            {/* Form Group 1: Select User */}
                                            <Form.Group as={Row} className="mb-3" controlId="formUser">
                                                <Form.Label column sm={5}>Username:</Form.Label>
                                                <Col sm={7}>
                                                    <Form.Select
                                                        value={selectedUserName}
                                                        onChange={e => setSelectedUserName(e.target.value)}
                                                    >
                                                        <option>Select user...</option>
                                                        {/* Map through normalUsers to display them in the dropdown */}
                                                        {allUsersData.normalUsers.map((normalUser, normalUserIndex) => {
                                                            return (
                                                                <option value={normalUser.username} key={normalUserIndex}>
                                                                    {normalUser.username} - {normalUser.role} user
                                                                </option>
                                                            )
                                                        })}

                                                        {/* Map through managementUsers to display them in the dropdown */}
                                                        {allUsersData.managementUsers.map((managementUser, managementUserIndex) => {
                                                            return (
                                                                <option value={managementUser.username} key={managementUserIndex}>
                                                                    {managementUser.username} - {managementUser.role} user
                                                                </option>
                                                            )
                                                        })}

                                                        {/* Map through adminUsers to display them in the dropdown */}
                                                        {allUsersData.adminUsers.map((adminUser, adminUserIndex) => {
                                                            return (
                                                                <option value={adminUser.username} key={adminUserIndex}>
                                                                    {adminUser.username} - {adminUser.role} user
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>

                                            {/* Form Group 2: Select New OU */}
                                            <Form.Group as={Row} className="mb-3" controlId="formOU">
                                                <Form.Label column sm={5}>Assign to OU:</Form.Label>
                                                <Col sm={7}>
                                                    <Form.Select
                                                        value={selectedOU}
                                                        onChange={e => setSelectedOU(e.target.value)}
                                                    >
                                                        <option>Select OU...</option>
                                                        {/* Map through ouData's orgUnits to display them in the dropdown */}
                                                        {ouData.orgUnits.map((orgUnit, unitIndex) => {
                                                            return (
                                                                <option value={orgUnit.ouName} key={unitIndex}>
                                                                    {orgUnit.ouName}
                                                                </option>
                                                            )
                                                        })}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>

                                            {/* Form Group 3: Select New Division */}
                                            {/* When  selectedOU is true */}
                                            {selectedOU &&
                                                <Form.Group as={Row} className="mb-3" controlId="formDivision">
                                                    <Form.Label column sm={5}>Assign to Division:</Form.Label>
                                                    <Col sm={7}>
                                                        <Form.Select
                                                            value={selectedDivision}
                                                            onChange={e => setSelectedDivision(e.target.value)}
                                                        >
                                                            <option>Select Division...</option>
                                                            <option value="none">none</option>
                                                            {/* Map through all OU's and their divisions to get their division names 
                                                                and display them in the dropdown. */}
                                                            {ouData.orgUnits.map((orgUnit, ouIndex) => {
                                                                // If the OU name matches the selectedOU, return its divisions in the dropdown list
                                                                if (orgUnit.ouName === selectedOU) {
                                                                    return (
                                                                        orgUnit.divisions.map((division, divisionIndex) => {
                                                                            return (
                                                                                <option
                                                                                    value={division.divisionName}
                                                                                    key={divisionIndex}
                                                                                >
                                                                                    {division.divisionName} (OU: {orgUnit.ouName})
                                                                                </option>
                                                                            )
                                                                        })
                                                                    )
                                                                } else {
                                                                    return (
                                                                        <option key={ouIndex} disabled>(OU: {orgUnit.ouName})</option>
                                                                    )
                                                                }
                                                            })}
                                                        </Form.Select>
                                                    </Col>
                                                </Form.Group>
                                            }

                                            {/* Form Group 4: Submit button */}
                                            <Form.Group as={Row} >
                                                <Col sm={{ span: 12 }}>
                                                    <Button type="submit" className="my-4">Assign User</Button>
                                                </Col>
                                            </Form.Group>
                                        </Form>

                                        {/* When error state is true, display error message under form */}
                                        {error &&
                                            <Container className="error border border-danger border-2">
                                                <Row>
                                                    <Col className="text-end">
                                                        <p className="closeMessageButton" onClick={handleHideError}>
                                                            close
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>{error}</p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        }

                                        {/* When success state is true, display success message under form */}
                                        {success &&
                                            <Container className="success border border-success border-2">
                                                <Row>
                                                    <Col className="text-end">
                                                        <p className="closeMessageButton" onClick={handleHideSuccess}>
                                                            close
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>{success}</p>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Card.Body>
                    </Tab>
                </Tabs>
            </Card>
        )
    }
}
