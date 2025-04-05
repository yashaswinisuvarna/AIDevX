import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from '../ui/dialog'
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { UserDetailContext } from './../../context/UserDetailsContext';
import axios from 'axios';
import { useMutation,useConvex } from 'convex/react'
import { api } from "../../convex/_generated/api"
import uuid4 from "uuid4";

  

const SignInDialog = ({openDialog, closeDialog}) => {
const {userDetail,setUserDetail}=useContext(UserDetailContext);

const convex = useConvex(); // Convex client instance
const CreateUser = useMutation(api.users.CreateUser); // Use api from convex instance


const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: { Authorization: `Bearer ${tokenResponse?.access_token}` }, // ✅ Fixed
        }
      );
  
      console.log(userInfo);
      const user=userInfo.data;
      await CreateUser({
        name:user?.name,
        email:user?.email,
        picture:user?.picture,
        uid: uuid4(),

      })
      if(typeof window!==undefined){
        localStorage.setItem('user',JSON.stringify(user))
      }
      setUserDetail(userInfo?.data);

      //Save this inside out Database
      closeDialog(false);
    },
    onError: errorResponse => console.log(errorResponse),
  });


  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
  
  <DialogContent>
    <DialogHeader>
        <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
        <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className='flex flex-col  items-center justify-center gap-3'>
            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
            <Button className="bg-blue-500 text-white hover:bg-blue-400 mt-3" onClick={googleLogin}>Sign In With Google</Button>

            <p className="text-sm">{Lookup?.SIGNIn_AGREEMENT_TEXT}</p>
        </div> 
  </DialogContent>
</Dialog>

  )
}

export default SignInDialog