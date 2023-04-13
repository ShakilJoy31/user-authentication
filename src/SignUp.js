import React, { useState } from 'react';
import { AiFillEye, AiFillGithub, AiOutlineLogout } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { GrGoogle } from "react-icons/gr";
import './Authentication.css';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';
import auth from './firebase.init';
import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    // const navigate = useNavigate();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);


    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    const [generalUser] = useAuthState(auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVasible, setIsPasswordVasible] = useState(true);
    const handleSignInButton = () => {
        if (email && password) {
            createUserWithEmailAndPassword(email, password);
        }
    }
    const [logOut, setLogOut] = useState(false);
    const handleLogOutButton = () => {
        setLogOut(true);
        setTimeout(() => {
            setLogOut(false);
            signOut(auth);
        }, 2500);
    }
    return (
        <div>
            {
                generalUser ? <div className='min-h-screen pt-8'>
                    <div className='min-h-screen'>
                        <h1 className='flex justify-center mb-4 text-2xl text-white'>Hello world!</h1>
                        <label htmlFor="confirmOrderFoodModal" onClick={handleLogOutButton} className={`block mx-auto w-48 flex gap-x-2 text-xl normal-case border-0 btn btn-sm mb-4 signUpButton`}> <span>Log out </span><span><AiOutlineLogout color='red' size={20}></AiOutlineLogout></span></label>
                    </div>
                </div> : <div className='flex items-center justify-center min-h-screen'>
                    <div style={{
                        backgroundColor: '#19A7CE',
                        borderRadius: '5px'
                    }} className="relative modal-box lg:w-[650px] md:w-[650px] w-[310px]">
                        <h1 className="flex justify-center text-4xl text-white">Sign up here</h1>
                        <div className="flex justify-center mt-6">
                            <div>
                                <div className='mb-4'>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Type your email here' className="w-[290px] bg-black border-0 lg:w-full md:w-full input focus:outline-none" required />
                                    <br />
                                    <div className="flex items-center justify-between my-6 bg-black border-0 rounded-lg">

                                        <input onChange={(e) => setPassword(e.target.value)} type={isPasswordVasible ? 'password' : 'text'} placeholder='Type your passwor' className="mr-4 bg-black border-0 w-[200px] lg:w-72 md:w-72 input focus:outline-none" />
                                        {
                                            isPasswordVasible ? <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEyeInvisible size={25}></AiFillEyeInvisible></span> : <span onClick={() => setIsPasswordVasible(!isPasswordVasible)} className="mr-2"><AiFillEye size={25}></AiFillEye></span>
                                        }
                                    </div>

                                </div>


                                <button onClick={handleSignInButton} className={`block w-full mx-auto text-xl normal-case border-0 btn mb-4 signUpButton`}>
                                {
                                    loading ? <div className='flex justify-center'>
                                    <div className='spinner'></div>
                                </div> : 'Sign up'
                                }
                                </button>

                                <div style={{
                                    borderTop: '1px solid red',
                                    height: '4px'
                                }} className="mb-4"></div>

                                <button onClick={() => signInWithGoogle()} className={` w-full text-xl normal-case border-0 btn mb-4 signUpButton`}> {
                                    googleLoading ? <div className='flex justify-center'>
                                    <div className='spinner'></div>
                                </div> : <div className='flex items-center justify-center gap-x-4'>
                                <span><GrGoogle size={25} color='red'></GrGoogle></span> <span>Sign up with Google</span>
                                </div>
                                } </button>

                                <button onClick={() => signInWithGithub()} className={`w-full text-xl normal-case border-0 btn mb-4 signUpButton`}>
                                {
                                    githubLoading ? <div className='flex justify-center'>
                                    <div className='spinner'></div>
                                </div> : <div className='flex items-center justify-center gap-x-4'>
                                <span className=''><AiFillGithub size={30} color='red'></AiFillGithub></span> <span>Sign up with github</span>
                                </div>
                                }
                                </button>

                            </div>
                        </div>
                        {
                            (error || googleError || githubError) ? <p className='flex justify-center text-xl text-red-700'>{error?.message || googleError?.message || githubError?.message}</p> : ''
                        }
                        
                    </div>
                </div>
            }

            {
                logOut && <div>
                    <input type="checkbox" id="confirmOrderFoodModal" className="modal-toggle" />
                    <div className="modal">
                        <div style={{
                            backgroundColor: '#19A7CE',
                            borderRadius: '5px',
                            width: '400px'
                        }} className="relative modal-box">
                            <div className='mt-4'>
                                <h3 className="flex justify-center text-2xl font-bold text-black"> <span className='mr-4 '><RiCheckboxCircleFill size={35}></RiCheckboxCircleFill></span> Success!</h3>
                                <p className="flex justify-center py-4 text-xl text-black">Log out successful.</p>
                                <p className='flex justify-center text-black'>Thank you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
};

export default SignUp;