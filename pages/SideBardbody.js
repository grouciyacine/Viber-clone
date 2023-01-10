import { Avatar, IconButton } from '@material-ui/core'
import { addDoc, collection, getFirestore, onSnapshot } from 'firebase/firestore'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import style from './SideBarbody.module.css'

const SideBardbody = ({newchat,id,name}) => {
 const [avatar,setAvatar]=useState()
useEffect(()=>{
setAvatar(Math.floor(Math.random()*5000))
 },[])
const addRoom=()=>{
const Rome=prompt('Enter Room Name:')
if(Rome){  
  const db=getFirestore();
  const colRef=collection(db,'rooms');
 addDoc(colRef,{
  room:Rome,
 }).then(alert("add Succefully"))
 .catch((err)=>console.log(err));  
}
}
return !newchat?(
<div className={style.car}>
<IconButton>
<Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>    
</IconButton>
<Link as={`/${name}/${id}`} href="/[rooms]/[Room]">
<div className={style.rl}>
<h2 className={style.r}>{name}</h2>
<h5 className={style.l}>last message....</h5> 
</div>
</Link>

</div>
):(
  <div className={style.car} onClick={addRoom}>
  <h3 className={style.add}>ADD New Room</h3>
  </div>
)}
export default SideBardbody