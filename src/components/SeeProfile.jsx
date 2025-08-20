import { useParams } from "react-router-dom"

const SeeProfile = () => {
    const { profileId } = useParams()
    console.log(profileId);


    const user = {
        name: "Sk Mursalin",
        username: "@msk",
        bio: "Fullstack Developer | Loves coding & coffee ☕",
        profilePhoto:
            "https://skmursalin.netlify.app/assets/portfolio-Bq600v_6.jpg",
        coverPhoto:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=300&fit=crop",
        friendsCount: 120,
        postsCount: 45,
    };

    return (
        <div className="max-w-3xl mx-auto mt-6 bg-transparent shadow-lg rounded-2xl overflow-hidden">
            <div className="relative">
                <img
                    src={user.coverPhoto}
                    alt="cover"
                    className="w-full h-40 object-cover"
                />
                <div className="absolute -bottom-12 left-6">
                    <img
                        src={user.profilePhoto}
                        alt="profile"
                        className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                    />
                </div>
            </div>

            <div className="mt-16 px-6 pb-6">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p>{user.username}</p>
                <p className="mt-3">{user.bio}</p>

                {/* Stats */}
                <div className="flex gap-8 mt-5 text-center">
                    <div>
                        <p className="font-bold">{user.postsCount}</p>
                        <span className="text-sm">Posts</span>
                    </div>
                    <div>
                        <p className="font-bold">{user.friendsCount}</p>
                        <span className="text-sm">Friends</span>
                    </div>
                </div>

                <div className="mt-6 flex gap-4">
                    <button
                        className="flex-1 bg-blue-500 py-2 rounded-xl font-medium hover:bg-blue-600"
                    >
                        See All Posts
                    </button>
                    <button
                        className="flex-1 bg-primary py-2 rounded-xl font-medium hover:bg-success"
                    >
                        See Friends
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeeProfile
