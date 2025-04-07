export default function UserProfile({params}: any) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1>Profile</h1>
        <hr />
        <p className="text-2xl font-bold">Profile page <span className="text-black bg-orange-500 p-2 rounded-md">{params.id}</span></p>
        <button className='bg-red-700 text-white p-2 rounded-md hover:cursor-pointer' >Logout</button>
      </div>
    );
  }
  