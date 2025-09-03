export default function UserFriends({allFriends}) {
    if (allFriends.length == 0) return <h1 className="max-w-2xl mx-auto p-4 text-3xl">No friend yet</h1>
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Friends</h2>

      <div className="flex flex-col  gap-4">
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
