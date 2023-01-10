import { Avatar, IconButton } from '@material-ui/core'
import { Camera, Help, PersonAdd,Call, AlternateEmail, Add, Send, Mood } from '@material-ui/icons'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import style from './body.module.css'
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore' 
import Router, { useRouter } from 'next/router'
  import { UserData } from './refreshdata'
const Body = ({name,id}) => {
  const [input,setInput]=useState()
  const [message,setMessage]=useState([])
  const [userName,setUserName]=useState()
  const [avatar,setAvatar]=useState()
  const [view,setView]=useState([])
  useEffect(()=>{
setAvatar(Math.floor(Math.random()*5000))
const user=UserData()
 setUserName(user[0].displayName)
 
  },[])
 console.log(userName)
  const Message=()=>{
    console.log(input)
    const db=getFirestore()
   const  colRef=collection(db,'rooms',id,'messages')
    addDoc(colRef,{
      message:input,
      time:serverTimestamp(),
      name:userName,
    })
    setInput("")
  }
  console.log(id)
  console.log(message)
  const router=useRouter()
const idref=router.query.Room
console.log(idref)
  useEffect(()=>{
    if(idref){
    const db=getFirestore()
    const messageRef=collection(db,'rooms',idref,'messages')
    const q=query(messageRef,orderBy('time','asc'))
    onSnapshot(q,(data)=>{
     setMessage(data.docs.map(
      doc=>doc.data()
     ))
    })
    const q2=query(messageRef,orderBy('time','desc'))
    onSnapshot(q2,(data)=>{
    setView(data.docs.map(
      doc=>doc.data()
    ))
    })
  }
},[idref])
  console.log(view)
  return (
    <div className={style.body}>
<div className={style.navbar}>
    <div className={style.total}>
        <div className={style.avatar}>
<IconButton>
<Avatar src={`https://avatars.dicebear.com/api/human/${avatar}.svg`}/>
</IconButton>       
</div>
<div className={style.info}>
<h3>{name}</h3>
<div className={style.deux}>
<h6>{new Date(view[0]?.time?.toDate()).toUTCString()}</h6>
<h5>Online</h5>   
</div>
  
</div>
</div>
<div className={style.navicon}>
  <IconButton>
   <PersonAdd/> 
  </IconButton>
    <IconButton>
     <Call/>  
    </IconButton>
   <IconButton>
    <Camera/>
   </IconButton>
    <IconButton>
    <Help/>  
    </IconButton>
</div>
</div>
<div className={style.bodychat}>
   <div className={style.data}>
    {message.map((mes)=>(
      <>
      <h6>{mes?.name}</h6>  
     <div className={style.datain}>
   <h4>{mes?.message}</h4> 
 <h6>{new Date(mes?.time?.toDate()).toUTCString()}</h6>     
    </div>
      </>
    
    ))}
    
   
    </div> 
</div>
<div className={style.footer}>
    <div className={style.totafo}>
  <div className={style.foot}>
    <IconButton>
     <Add/>   
    </IconButton>
    <IconButton>
<Mood/>
    </IconButton>
    <IconButton>
     <AlternateEmail/>    
    </IconButton>
    <input placeholder='Sa Hii..' type='text' value={input || ''} onChange={(e)=>setInput(e.target.value)}/>
    </div>
    <div className={style.but} onClick={Message}>
    <IconButton>
    <Send />
    </IconButton>  
    </div>
    </div>
</div>
    </div>
  )
}

export default Body