import UserCard from "./UserCard";

function UserList({
    users,
    onEdit,
    onDelete,
}) {
    return (
        <div className="user-list">
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default UserList;