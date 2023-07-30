import { authModalState } from '@/atoms/authModalAtom';
import { auth } from '@/firebase/firebase';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';




type LoginProps = {
    
};

const Login:React.FC<LoginProps> = () => {


//firebase hooks
const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

    const setAuthModalState = useSetRecoilState(authModalState)


    //redirects to other authentication forms
    const handleForgot = () => {
        setAuthModalState((prev) => ({...prev, type: 'forgotPassword' }));
    }
    const handleSignup = () => {
        setAuthModalState((prev) => ({...prev, type: 'register' }));
    }

    //handles the login
    const router = useRouter()
    const [inputs, setInputs] = useState({email:'',password:''})

    const handleChangeInputs = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please provide email and password!")
        try {
            const login = await signInWithEmailAndPassword(inputs.email, inputs.password)
            if (!login) {
                return
            }
            
            router.push('/')
        }
        catch (error: any) {
            alert(error?.message.replace('Firebase: Error ', 'Failed login! '))

        }
    }

    useEffect(() => {
        if (error) alert(error.message.replace('Firebase: Error ', 'Failed login! ').replace('Firebase: ', 'Failed login! '))
    }, [error])


    return (
        <form onSubmit={handleLogin} className="space-y-6 px-6 pb-4">
            <h3 className='text-xl font-medium text-white'>Sign in to Code Clan!</h3>
        <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                Your Email
            </label>
            <input onChange={handleChangeInputs} type="email" name="email" id="email" className="
            border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
            "
            placeholder='name@company.com'
            />
        </div>
        <div>
            <label htmlFor="password" className="text-sm font-medium block mb-2 text-gray-300">
                Your Password
            </label>
            <input onChange={handleChangeInputs} type="password" name="password" id="password" className="
            border-2 outline-none sm:text-sm rounded-1g focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white
            "
            placeholder='Harder-toguess_thanthis1234'
            />
        </div>

        <button type="submit" className="w-full text-white focus:ring-blue-300 font-medium rounded-1g
        text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s">
            Login
        </button>
        <button className='flex w-full justify-end focus:ring-blue-300' >
            <a href="#" className='text-sm block text-brand-orange hover:underline w-full text-right' onClick={handleForgot}>
                Forgot Password?
            </a>
        </button>
        <div className="text-sm font-medium text-gray-500">
            Need to sign up?
            <a href="#" className="text-blue-700 hover:underline" onClick={handleSignup}> Create account</a>
        </div>
        </form>
    )
}
export default Login;