import { useEffect, useState } from "react";
import { BASE_URL } from "../constance/secret";


type Message = {
  sender: "Me" | "Them";
  text: string;
};


export default function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [users, setUsers] = useState<{id:number, name:string}[]>([])
  const [chats, setChats] = useState<Record<number, Message[]>>({});
  const [selectedUser, setSelectedUser] = useState<{name:string, id:number} | null>(null);
  const [input, setInput] = useState("");


  useEffect(()=>{
   const getUsers=async()=>{
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/users`);
      const result = await res.json()
      setUsers(result)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
   }
   getUsers()
  },[])


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // const newMessage: Message = { sender: "Me", text: input.trim() };

    // setChats((prev) => ({
    //   ...prev,
    //   [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
    // }));

    setInput("");
  };

  const messages = selectedUser?.id?  chats[selectedUser?.id] || [] : []

  if(isLoading) return <h1>Loading...</h1>
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* User List */}
      <div className="md:w-1/3 lg:w-1/4 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-xl font-semibold p-4 border-b">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user?.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user?.id ? "bg-gray-300" : ""}`}
            >
              {user?.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      {/* <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center border-b p-4 bg-white shadow">
          <h2 className="text-xl font-semibold">{selectedUser?.name}</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 rounded-lg ${
                msg.sender === "Me"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-300 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form
          className="flex p-4 border-t bg-white"
          onSubmit={handleSend}
        > 
          <input
            type="text"
            placeholder={`Message ${selectedUser?.name}`}
            className="flex-1 border rounded-l px-4 py-2 focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div> */}
    </div>
  );
}


 {/* Input */}
        {/* receive message display button */}
        {/* <button
          onClick={() => {
            const newMessage = { sender: "Them", text: "This is a test reply!" };
              setChats((prev) => ({
                ...prev,
                [selectedUserId]: [...(prev[selectedUserId] || []), newMessage],
              }));
            }}
          className="m-4 self-start bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Simulate Incoming Message
        </button> */}