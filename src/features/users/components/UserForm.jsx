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
        <div className="user-form-container">
            <form className="user-form" onSubmit={onSubmit}>
                <h2>{isEditing ? "Edit User" : "Add New User"}</h2>
                <input
                    className="form-input"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    className="form-input"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
                <select
                    className="form-select"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    {availableRoles.map(role => (
                        <option key={role} value={role}>{role.toUpperCase()}</option>
                    ))}
                </select>
                <button className="primary-button" type="submit">{isEditing ? "Edit User" : "Add User"}</button>
                <button className="secondary-button" type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}

export default UserForm;