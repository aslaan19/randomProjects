import React, { useEffect, useState } from 'react'
import Suggest from './suggest'


export default function Auto() {
    const[users,setUsers] = useState([])
    const[loading,setLoading]= useState(false)
    const[searchParam,setSearchP] = useState("")
    const[showDrop,setShowDrop]= useState(false)
    const[filteredUsers,setFiltered] = useState([])
    async function fetchUsers() {
        try {
          setLoading(true);
          const response = await fetch("https://dummyjson.com/users");
          const data = await response.json();
    
          if (data && data.users && data.users.length) {
            setUsers(data.users.map((userItem) => userItem.firstName));
        setLoading(false);
        
            
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
          
        }
      }
function handleSearch(e){
    const query = e.target.value.toLowerCase()
    setSearchP(query)
    const filtered= users.filter((item)=>item.toLowerCase().indexOf(query)>-1)
    setFiltered(filtered)
    console.log(filtered)
}

function handlclick(event){
    const text = event.target.innerText
    setSearchP(text)
    setFiltered([])
}
    useEffect(() => {
        fetchUsers();
      }, []);

  return (
    <div>
      <input type="text" name="userSearch" value={searchParam} onChange={handleSearch} />
        <Suggest data={filteredUsers} handlclick={handlclick}/>
    </div>
  )
}
