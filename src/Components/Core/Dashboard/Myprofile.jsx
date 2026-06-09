import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import {FiEdit} from "react-icons/fi"

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div className='mx-auto w-11/12 max-w-250 '>
        <div className=''>
        <h1 className='mb-14 text-3xl font-medium text-[#F1F2FF]'>
            My Profile
        </h1>
        
        {/* section 1 */}
        <div className='flex items-center justify-between rounded-md border-2 border-[#2C333F] bg-[#161D29] p-3 md:p-8 md:px-12'>
            <div className='flex items-center gap-x-4 '>
                <img 
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className='aspect-square w-19.5 rounded-full object-cover' />
                <div className='space-y-1'>
                    <p className='text-lg font-semibold text-[#F1F2FF]'> {user?.firstName + " " + user?.lastName} </p>
                    <p className=' text-[11px] md:text-sm text-[#838894] md:max-w-full max-w-55 wrap-break-word'> {user?.email}</p>
                </div>
            </div>
            <div className="hidden md:block">
            <IconBtn
                text="Edit"
                
                onclick={() => {
                    navigate("/dashboard/settings")
                }} > <FiEdit/>
            </IconBtn>
            </div>
        </div>

        {/* section 2 */}
        <div className='my-10 flex flex-col gap-y-3 md:gap-y-10 rounded-md border-2 border-[#2C333F] bg-[#161D29] p-3 md:p-8 md:px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-[#F1F2FF]'>About</p>
                <div >
                <IconBtn 
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} ><FiEdit/> </IconBtn>
                </div>
            </div>
            <p className='text-[#6E727F] text-sm font-medium'> {user?.additionalDetails?.about  ??  "Write Something about Yourself"}</p>
        </div>

        {/* section 3 */}
        <div className='my-10 flex flex-col gap-y-10 rounded-md border-2 border-[#2C333F] bg-[#161D29] p-10 md:p-10 md:px-12'>
            <div className='flex w-full items-center justify-between'>
                <p className='lg:text-2xl sm:text-xl font-semibold text-[#F1F2FF]'>Personal Details</p>
                <div className=''>
                <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }} ><FiEdit/> </IconBtn>
                
                </div>
            </div>
            <div className='flex gap-y-5 md:flex-row flex-col max-w-125 justify-between'>
                <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-[#F1F2FF] font-medium'>First Name</p>
                    <p className='text-sm font-medium  text-[#AFB2BF]'>{user?.firstName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-[#F1F2FF] font-medium'>Email</p>
                    <p className='text-sm font-medium  text-[#AFB2BF] wrap-break-word'>{user?.email}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-[#F1F2FF] font-medium'>Gender</p>
                    <p className='text-sm font-medium text-[#AFB2BF] '>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
                </div>


                <div className='flex flex-col gap-y-5'>
                <div>
                    <p className='mb-2 text-sm text-[#AFB2BF] font-medium'>Last Name</p>
                    <p className='text-sm font-medium text-[#F1F2FF]'>{user?.lastName}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-[#AFB2BF] font-medium'>Phone Number</p>
                    <p className='text-sm font-medium text-[#F1F2FF]'>{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                    <p className='mb-2 text-sm text-[#AFB2BF]'>Date of Birth</p>
                    <p className='text-sm font-medium text-[#F1F2FF]'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
                </div>
            </div>
        </div>

      </div>
    </div>
    </div>
    
  )
}

export default MyProfile