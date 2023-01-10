import React, { useEffect, useState } from 'react'
import styles from './SideBar.module.css'
import { Camera, Chat, Dialpad, Input, PhoneCallback, Search } from '@material-ui/icons'
import { Avatar, IconButton } from '@material-ui/core'
import SideBardbody from './SideBardbody'
import { app ,db} from './FireBase'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { UserData, UserToken } from './refreshdata'
import { useRouter } from 'next/router'
const SideBar = () => {
const [rooms,setRooms]=useState([]); 
const [data,setData]=useState([]);
const route=useRouter();
useEffect(()=>{
  const db=getFirestore()
  const colRef=collection(db,'rooms')
  onSnapshot(colRef,(snapshot)=>{
  setRooms(snapshot.docs.map((doc)=>({
  id:doc.id,
  data : doc.data(),
  })))
  })},[])
useEffect(()=>{
  const a=UserToken();
  if(!a) route.push('/Login')
const [userInfo]=UserData();
setData(userInfo)

},[])
const logout=()=>{
  localStorage.clear()
  route.push('/Login')
}
return(
    <div className={styles.container_all}>
     
        <div className={styles.header}>
          <div className={styles.headericone}>
            <IconButton>
              
              <Avatar src={data?.photoURL}/>
            </IconButton>
            <IconButton>
              <Chat />
            </IconButton>
            <IconButton>
              <PhoneCallback />
            </IconButton>
            <IconButton>
              <Dialpad />
            </IconButton>
          </div>
          <div className={styles.input}>
            <div className={styles.inp}>
              <Search className={styles.sea} />
              <input type='text' placeholder='Searche....' />
            </div>
            <div onClick={logout}>
                <IconButton>
              <Input />
            </IconButton>
            </div>
          

          </div>
          <div className={styles.vibetype}>
            <h4 className={styles.firstrow}>Viber Only</h4>
            <h4>All</h4>
          </div>
        </div>
        
        <div className={styles.body}>
          <SideBardbody newchat />
          {rooms.map((room)=>(
<SideBardbody key={room.id} id={room.id} name={room.data.room}/>
          ))}
          
         
        </div>
      </div>
    
  )
}

export default SideBar