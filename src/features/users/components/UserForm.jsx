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
        formError,
        setFormError
    }) {
    return (
        <div className="user-form-container">
            <form className="user-form" onSubmit={onSubmit}>
                <h2>{isEditing ? "Edit User" : "Add New User"}</h2>
                {formError && (
                    <p className="form-error">{formError}</p>
                )}
                <input
                    className="form-input"
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={e => {
                        setFirstName(e.target.value);
                        setFormError("");
                    }}
                />
                <input
                    className="form-input"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={e => {
                        setLastName(e.target.value);
                        setFormError("");
                    }}
                />
                <input
                    className="form-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value);
                        setFormError("");
                    }}
                />
                <input
                    className="form-input"
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={e => {
                        setAge(e.target.value);
                        setFormError("");
                    }}
                />
                <select
                    className="form-select"
                    value={role}
                    onChange={e => {
                        setRole(e.target.value);
                        setFormError("");
                    }}
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