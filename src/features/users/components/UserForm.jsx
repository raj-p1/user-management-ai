function UserForm(
    { firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        age,
        setAge,
        role,
        setRole,
        availableRoles,
        onSubmit,
        onCancel,
        isEditing,
    }) {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h2>{isEditing ? "Edit User" : "Add New User"}</h2>
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
                    <option value="">Select Role</option>
                    {availableRoles.map(role => (
                        <option key={role} value={role}>{role.toUpperCase()}</option>
                    ))}
                </select>
                <button type="submit">{isEditing ? "Edit User" : "Add User"}</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UserForm;