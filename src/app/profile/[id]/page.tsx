export default async function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl m-5">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-1 ml-2 rounded-lg bg-orange-500 text-black ">
          {params.id}
        </span>
      </p>
    </div>
  );
}
