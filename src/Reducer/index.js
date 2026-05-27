import { combineReducers } from "redux";
import authReducer from '../Slices/authSlice'
import cartReducer from "../Slices/cartSlice"
import profieReducer from "../Slices/profileSlice";
import courseReducer from '../Slices/courseSlice'
import viewCourseReducer from '../Slices/viewCourseSlice'


const rootReducer = combineReducers({

    auth:authReducer,
    cart:cartReducer,
    profile:profieReducer,
    course:courseReducer,
    viewCourse: viewCourseReducer,   // yaha add karo
    
})

export default rootReducer;