function UserCard({
    user,
    onEdit,
    onDelete
}) {
    return (
        <div>
            <div>
               {user.firstName} - {user.lastName} - {user.email} - {user.age} - {user.role.toUpperCase()}
                <button onClick={() => onEdit(user.id)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
            </div>
        </div>
    )
}

export default UserCard;