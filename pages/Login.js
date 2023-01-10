import React from 'react'
import Image from 'next/image'
import {GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup, getAuth}from 'firebase/auth'
import logo from '../logo.png'
import styles from './login.module.css'
import { useState } from 'react'
import {useRouter} from 'next/router'
import db from './FireBase'
import { async } from '@firebase/util'

const Login = () => {
  const auth=getAuth()  
  const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [name,setName]=useState()
    const [data,setData]=useState([])
    const rout=useRouter();
       
const google=new GoogleAuthProvider()
const login=async()=>{
const {user}= await signInWithPopup(auth,google)
const {providerData,refreshToken}=user;
console.log(user)
console.log(providerData,refreshToken)
localStorage.setItem('user',JSON.stringify(providerData))
localStorage.setItem('token',JSON.stringify(refreshToken))
rout.push('/')
}
const newPerson=async()=>{
const {user}=await createUserWithEmailAndPassword(auth,email,password)
const {providerData,refreshToken}=user
providerData.displayName=name;
console.log(user)
console.log(providerData,refreshToken)
localStorage.setItem('user',JSON.stringify(providerData))
localStorage.setItem('token',JSON.stringify(refreshToken))  
rout.push('/')
}
const oldAcount=async()=>{
    const {user}=await signInWithEmailAndPassword(auth,email,password)

    const {providerData,refreshToken}=user
    providerData.displayName=name;
    console.log(user)
    console.log(providerData,refreshToken)
    localStorage.setItem('user',JSON.stringify(providerData))
localStorage.setItem('token',JSON.stringify(refreshToken))

 rout.push('/')

  }
  return (
    <>
    <div className={styles.con}>
<div className={styles.total}>
        <Image className={styles.img} src={logo} width="120" alt='Viber-Clone' height="120"/>
        <div className={styles.ti}>
            <input type='text' value={email} onChange={(e)=>setEmail(e.target.value)} className={styles.in} placeholder='enter your email'/>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} className={styles.in} placeholder='enter your name'/>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} className={styles.in} placeholder='enter your Password'/>
        
        <button className={styles.button1} onClick={login}>Login With Google </button> 
        <button className={styles.button1} onClick={newPerson}>Creat A Count </button>  
        <button className={styles.button1} onClick={oldAcount}>Sign with Account</button> 
                 
        </div>
      <h6 className={styles.h6}>{new Date().getFullYear().toString() }ViberClone</h6>
    </div>
    </div>
    

    </>
    
  
  )
}
export default Login