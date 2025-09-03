export default function UserPosts({ allPosts }) {
    if (allPosts.length == 0) return <h1 className="max-w-2xl mx-auto p-4 text-3xl">No post yet</h1>
    const { firstName, lastName } = allPosts?.[0]?.postCreatedBy;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">{`${firstName} ${lastName}'s posts`}</h2>

            {allPosts.map((post) => (
                <div
                    key={post._id}
                    className="bg-transparent shadow-md rounded-xl p-4 mb-4 border"
                >
                    <p>{post.content}</p>
                    {post.postPhoto && (
                        <img
                            src={post.postPhoto}
                            alt="post"
                            className="mt-3 rounded-xl w-full object-cover"
                        />
                    )}
                    <p className=" text-sm mt-2">{post.createdAt}</p>
                </div>
            ))}
        </div>
    );
}
