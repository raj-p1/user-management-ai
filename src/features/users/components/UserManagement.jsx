import { useState, useEffect } from "react"
export default function UserManagement() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("all");
    const [selectedRole, setSelectedRole] = useState("all");
    const [age, setAge] = useState("");
    const [sorting, setSorting] = useState("all");
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    async function fetchUsers(signal) {
        try {
            setError("");
            const res = await fetch("https://dummyjson.com/users", {
                signal
            })
            if (!res.ok) {
                throw new Error("Failed to fetch users.");
            }
            const data = await res.json();
            setUsers(data.users);
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

    function handleAddUser(e) {
        e.preventDefault();
        if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || !email.includes("@") || role === "all" || age.trim() === "" || Number(age) < 18 || Number(age) > 100) return;
        if (editUserId !== null) {
            setUsers(prev => prev.map((currentUser) => {
                if (currentUser.id === editUserId) {
                    return {
                        ...currentUser,
                        firstName,
                        lastName,
                        email,
                        age: Number(age),
                        role,
                    }
                }
                return currentUser;
            }))
            setEditUserId(null);
        }
        else {
            const newUser = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                age: Number(age),
                role,
            }
            setUsers(prev => [...prev, newUser]);
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setAge("");
        setRole("all");
        setShowForm(false);
    };
    function handleDeleteUser(id) {
        setUsers(prev => prev.filter(currentUser => currentUser.id !== id));
    };
    function handleEditUser(id) {
        const updatedUser = users.find(currentUser => currentUser.id === id);
        if (!updatedUser) return;
        setFirstName(updatedUser.firstName);
        setLastName(updatedUser.lastName);
        setEmail(updatedUser.email);
        setAge(updatedUser.age);
        setRole(updatedUser.role);
        setEditUserId(id);
        setShowForm(true);
    };
    function handleCancelUser() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setAge("");
        setRole("all");
        setEditUserId(null);
        setShowForm(false);
    }

    const roles = [
        ...new Set(users.map(user => user.role))
    ]

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

    return (
        <div>
            <h1>User Management Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search user here..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
                    <option value="all">All</option>
                    {roles.map(userRole => (
                        <option key={userRole} value={userRole}>{userRole.toUpperCase()}</option>
                    ))}
                </select>
                <select value={sorting} onChange={e => setSorting(e.target.value)}>
                    <option value="all">All</option>
                    <option value="name a-z">Name A-Z</option>
                    <option value="name z-a">Name Z-A</option>
                    <option value="age low-high">Age Low-High</option>
                    <option value="age high-low">Age High-Low</option>
                </select>
            </div>
            {loading && (<p>Loading...</p>)}
            {error && (<p>Error: {error}</p>)}
            <button onClick={() => setShowForm(!showForm)}>{showForm ? "Hide Form" : "Add User"}</button>
            {showForm && (
                <form onSubmit={handleAddUser}>
                    <h2>{editUserId !== null ? "Edit User" : "Add New User"}</h2>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                    <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                    >
                        {roles.map(role => (
                            <option key={role} value={role}>{role.toUpperCase()}</option>
                        ))}
                    </select>
                    <button type="submit">{editUserId !== null ? "Edit User" : "Add User"}</button>
                    <button type="button" onClick={handleCancelUser}>Cancel</button>
                </form>
            )}
            <div>
                {sortedUsers.map((user) => (
                    <div key={user.id}>
                        {user.firstName} - {user.lastName} - {user.email} - {user.age} - {user.role.toUpperCase()}
                        <button onClick={() => handleEditUser(user.id)}>Edit</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}