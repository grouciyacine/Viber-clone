import React from 'react'
import Body from '../Body'
import SideBar from '../SideBar'
import styles from '../index.module.css'
import { useRouter } from 'next/router'
const Room = () => {
const rout= useRouter()

    return(

        <div className={styles.containner}>
        <div className={styles.body}>
         <SideBar/>
         <Body name={rout.query.rooms} id={rout.query.Room}/>
        </div>
      </div>
  )
}

export default Room
