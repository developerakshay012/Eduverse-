import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Setting = () => {
  return (
    <div>
        
        <h1 className="mb-14 text-3xl text-center    text-yellow-400 font-semibold">
        Edit Profile
      </h1>
        {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />

    </div>
  )
}

export default Setting

