import { auth } from '@/firebase/firebase';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import {FiLogOut} from 'react-icons/fi'

const Logout:React.FC = () => {
    const [signOut, loading, error] = useSignOut(auth)


const handleLogOut = () => {
    signOut()
}


    return (
        <button onClick={handleLogOut} className="bg-dark-fill-3 py-1.5 px-3 cursor-ponter rounded text-brand-orange">
            <FiLogOut />
        </button>
    )
}
export default Logout;