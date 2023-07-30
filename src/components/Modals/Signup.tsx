import { authModalState } from '@/atoms/authModalAtom';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/firebase/firebase'
import { useRouter } from 'next/router';


type SignupProps = {
    
};

const Signup:React.FC<SignupProps> = () => {


//firebase hooks
const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);


    const setAuthModalState = useSetRecoilState(authModalState)

    const handleLoginClick = () => {
        setAuthModalState((prev) => ({...prev, isOpen: true, type: 'login' }));
    }

    const [inputs, setInputs] = useState({email:'',username:'',password:''})
    const router = useRouter();

    const handleChangeInputs = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }



    const handleSignup =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);
        if(!newUser) {
              return
        }
        router.push('/')
        }
        catch (error:any)
        {
            
           alert(error.message.replace('Firebase: Error ', 'Failed signup! '))
        }
        
    }

    useEffect(() => {
        if (error) alert(error.message.replace('Firebase: Error ', 'Failed signup! ').replace('Firebase: ', 'Failed signup! '))
    }, [error])
    
    return (
    <form className="space-y-6 px-6 pb-4" onSubmit={handleSignup}>
    <h3 className='text-xl font-medium text-white'>Join the Code Clan!</h3>
<div>
    <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
        Your Email
    </label>
    <input type="email" name="email" id="email" className="
    border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
    placeholder='name@company.com'
    onChange={handleChangeInputs}
    />
</div>
<div>
    <label htmlFor="username" className="text-sm font-medium block mb-2 text-gray-300">
        Your Username
    </label>
    <input type="text" name="username" id="username" className="
    border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
    placeholder='Joe Codes'
    onChange={handleChangeInputs}
    />
</div>
<div>
    <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
        Your Password
    </label>
    <input type="password" name="password" id="password" className="
    border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
    placeholder='Harder-toguess_thanthis1234'
    onChange={handleChangeInputs}
    />
</div>
<div>
    <label htmlFor="confirm-password" className="text-sm font-medium block mb-2 text-gray-300">
        Confirm Password
    </label>
    <input type="password" name="confirm-password" id="confirm-password" className="
    border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
    bg-gray-600 border-gray-500 placeholder-gray-400 text-white
    "
    placeholder='Harder-toguess_thanthis1234'
    />
</div>

<button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-1g
text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
    Join the Clan!
</button>

<div className="text-sm font-medium text-gray-500">
   Already a member?
    <a href="#" className="text-blue-700 hover:underline" onClick={handleLoginClick}> Login</a>
</div>
</form>)
}
export default Signup;