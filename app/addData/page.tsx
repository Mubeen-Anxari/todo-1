"use client";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

interface UserDetails {
  id:string
  name: string;
}

const AddData = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState<UserDetails[]>([]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Users"), {
        name: username,
      });
      setUsername(""); 
      fetchData(); 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const snapShot = await getDocs(collection(db, "Users"));
      const userList: UserDetails[] = snapShot.docs.map(doc => ({
        id:doc.id,
        name: doc.data().name,
      }));
      setUsers(userList);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);
const handleDelete=async(id:string)=>{
  await deleteDoc(doc(db, "Users",id));
  fetchData();
}
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add User
          </button>
        </form>


        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-center">Users List</h3>
          {users.length > 0 ? (
            <ul className="list-disc flex gap-2 list-inside">
              {users.map((user, index) => (
                <li key={index} className="text-gray-800">
                  {user.name}
                  <button className=" bg-red-500 hover:bg-red-800 text-white p-1 rounded" onClick={()=>{
                    handleDelete(user.id)
                  }}>Del</button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddData;
