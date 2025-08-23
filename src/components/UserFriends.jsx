export default function UserFriends({allFriends}) {
    
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Friends</h2>

      <div className="grid grid-cols-2 gap-4">
        {allFriends.map((friend) => (
          <div
            key={friend._id}
            className="bg-transparent shadow-md rounded-xl p-4 flex items-center gap-3 border  cursor-pointer"
          >
            <img
              src={friend.photoUrl}
              alt={friend.firstName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">{`${friend.firstName} ${friend.lastName}`}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
