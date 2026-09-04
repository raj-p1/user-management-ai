import { useState, useEffect } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../userApi";
import UserForm from "./UserForm";
import UserList from "./UserList";
import "./UserManagement.css";

export default function UserManagement() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");
    const [age, setAge] = useState("");
    const [sorting, setSorting] = useState("default");
    const [users, setUsers] = useState([]);
    const [availableRoles, setAvailableRoles] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [formError, setFormError] = useState("");

    async function fetchUsers(signal) {
        try {
            setError("");
            const data = await getUsers(signal);
            setUsers(data);
            setAvailableRoles([
                ...new Set(data.map(user => user.role))
            ]);
        }
        catch (error) {
            if (error.name !== "AbortError") {
                return setError("Something went wrong. Please try again.")
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchUsers(controller.signal);

        return () => {
            controller.abort();
        }
    }, []);

    async function handleAddUser(e) {
        e.preventDefault();
        if (firstName.trim() === "" ||
            lastName.trim() === "" ||
            email.trim() === "" ||
            role === "" ||
            age.trim() === ""
        ) {
            setFormError("Please fill in all required fields.");
            return;
        }
        if (!email.includes("@")) {
            setFormError("Please enter a valid email address.");
            return;
        }
        if (Number(age) < 18 || Number(age) > 100) {
            setFormError("Age must be between 18 to 100.");
            return;
        }
        if (editUserId !== null) {
            try {
                const updatedUser = await updateUser({
                    firstName,
                    lastName,
                    email,
                    age: Number(age),
                    role,
                },
                    editUserId
                );
                setUsers(prev => prev.map((currentUser) => {
                    if (currentUser.id === editUserId) {
                        return updatedUser;
                    }
                    return currentUser;
                }))
                setEditUserId(null);
            }
            catch (error) {
                console.error("Error: ", error);
                setFormError("Failed to edit user. Please try again.");
                return;
            }
        }
        else {
            try {
                const createdUser = await addUser({
                    firstName,
                    lastName,
                    email,
                    age: Number(age),
                    role,
                });
                setUsers(prev => [...prev, createdUser]);
            }
            catch (error) {
                console.error("Error: ", error);
                setFormError("Failed to create user. Please try again.");
                return;
            }
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setAge("");
        setRole("");
        setShowForm(false);
        setFormError("");
    };
    async function handleDeleteUser(id) {
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(currentUser => currentUser.id !== id));
        }
        catch (error) {
            console.error("Error: ", error);
            setFormError("Failed to delete user. Please try again.");
            return;
        }
    };
    function handleEditUser(id) {
        const updatedUser = users.find(currentUser => currentUser.id === id);
        if (!updatedUser) return;
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setEmail(updatedUser.email);
        setAge(String(updatedUser.age));
        setRole(updatedUser.role);
        setEditUserId(id);
        setShowForm(true);
    };
    function handleCancelUser() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAge("");
        setRole("");
        setEditUserId(null);
        setShowForm(false);
    }

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.firstName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
            user.lastName
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            user.email
                .toLowerCase()
                .includes(search.toLowerCase());
        const matchesRole =
            selectedRole === "all" || user.role === selectedRole;

        return matchesRole && matchesSearch;
    })

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        switch (sorting) {
            case "name a-z":
                return a.firstName.localeCompare(b.firstName);
            case "name z-a":
                return b.firstName.localeCompare(a.firstName);
            case "age low-high":
                return a.age - b.age;
            case "age high-low":
                return b.age - a.age;
            default:
                return 0;
        }
    })

    const usersCount = sortedUsers.length;
    const adminCount = sortedUsers.filter(user => user.role === "admin").length;
    const moderatorCount = sortedUsers.filter(user => user.role === "moderator").length;
    const otherCount = usersCount - adminCount - moderatorCount;

    return (
        <div className="user-management">
            <header className="dashboard-header">
                <h1>User Management Dashboard</h1>
                <p>Manage users, search, filter and sort your users.</p>
            </header>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <span>Total Users</span>
                    <strong>{usersCount}</strong>
                </div>
                <div className="stat-card">
                    <span>Admins</span>
                    <strong>{adminCount}</strong>
                </div>

                <div className="stat-card">
                    <span>Moderators</span>
                    <strong>{moderatorCount}</strong>
                </div>

                <div className="stat-card">
                    <span>Others</span>
                    <strong>{otherCount}</strong>
                </div>
            </div>
            <div className="user-controls">
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search user here..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select className="filter-select" value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                    <option value="all">All</option>
                    {availableRoles.map(userRole => (
                        <option key={userRole} value={userRole}>{userRole.toUpperCase()}</option>
                    ))}
                </select>
                <select className="filter-select" value={sorting} onChange={e => setSorting(e.target.value)}>
                    <option value="default">Default</option>
                    <option value="name a-z">Name A-Z</option>
                    <option value="name z-a">Name Z-A</option>
                    <option value="age low-high">Age Low-High</option>
                    <option value="age high-low">Age High-Low</option>
                </select>
            </div>
            {loading && (<p className="loading-message">Loading...</p>)}
            {error && (<p className="error-message">Error: {error}</p>)}
            <button className="add-user-button" onClick={() => setShowForm(!showForm)}>{showForm ? "Hide Form" : "Add User"}</button>
            {showForm && (
                <UserForm
                    formError={formError}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    setFormError={setFormError}
                    age={age}
                    setAge={setAge}
                    role={role}
                    setRole={setRole}
                    availableRoles={availableRoles}
                    onSubmit={handleAddUser}
                    onCancel={handleCancelUser}
                    isEditing={editUserId !== null}
                />
            )}
            <div>
                <UserList
                    users={sortedUsers}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                />
            </div>
        </div>
    )
}