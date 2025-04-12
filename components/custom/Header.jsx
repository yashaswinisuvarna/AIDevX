import React, { useContext } from 'react'
import { Button } from '../ui/button'
import Colors from '@/data/Colors'
import Image from 'next/image'
import { UserDetailContext } from '@/context/UserDetailsContext'

const Header = () => {
  const {userDetail,setUserdetail}=useContext(UserDetailContext);
  return (
    <div className='p-4 flex justify-between items-center'>
        <Image src={'/logo.png'} alt='Logo' width={40} height={40}/>
        {!userDetail?.name &&<div className='flex gap-5'>
          <Button variant="ghost">Sign In</Button>
          <Button className="text-white" style={{
            backgroundColor:Colors.BLUE 
          }}>Get Started</Button>
        </div>}
    </div>
  )
}

export default Header