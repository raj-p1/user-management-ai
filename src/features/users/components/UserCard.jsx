function UserCard({
    user,
    onEdit,
    onDelete
}) {
    return (
        <div className="user-card">
            <div className="user-info">
                <h3>{user.firstName}  {user.lastName}</h3>
                <p>{user.email}</p>
                <div className="user-meta">
                    <span>{user.age} years</span> 
                    <div>{user.role.toUpperCase()}</div>
                </div>
            </div>
            <div className="user-actions">
                <button
                    className="edit-button"
                    onClick={() => onEdit(user.id)}
                >
                    Edit
                </button>
                <button
                    className="delete-button"
                    onClick={() => onDelete(user.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default UserCard;