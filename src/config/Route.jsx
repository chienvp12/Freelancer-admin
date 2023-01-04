import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Admin from '../component/Admin/Admin'
import Dashbroad from '../component/Dashbroad/Dashbroad'
import User from '../component/User/User' 
import Freelancer from '../component/Freelancer/Freelancer'
import Job from '../component/Job/Job'
import Transaction from '../component/Transaction/Transaction'
import Statistical from '../component/Statistical/Statistical'
// import Statistical
function Routers() {
  return (
    <Routes>
        <Route path="/dashboard" element = {<Dashbroad/>} />
        <Route path="/admin" element = {<Admin/>} />
        <Route path="/user" element = {<User/>} />
        <Route path="/freelancer" element = {<Freelancer/>} />
        <Route path="/job" element = {<Job/>} />
        <Route path="/transaction" element = {<Transaction/>} />
        <Route path="/statistical" element = {<Statistical/>} />
        {/* <Route  path='/login' element ={<Login />} />          */}
    </Routes>
    
  )
}

export default Routers;