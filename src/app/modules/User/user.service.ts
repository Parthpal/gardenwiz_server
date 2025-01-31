import { sendImageToCloudanary } from "../../utils/sendImageToCloudinary";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUser=async(payload:TUser)=>{
    const user=User.create(payload);
    return user
}
const updateUserS=async(payload:TUser,id:string,imageData:any)=>{
        let profilePhoto:string='';
        // console.log(payload,id,imageData);
        const imageName=`${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
        const path=imageData?.path;
                const result = await sendImageToCloudanary(imageName, path);
                if (result) {
                    const { secure_url } = result; // Extract secure_url from the response
                   // console.log(secure_url, 'ssecureurl');
                    profilePhoto=secure_url// Add the secure_url to the images array
                   // console.log(payload);
                   
                } else {
                    console.log("Image upload failed, no result returned.");
                }
        // Find and update the user
           const { name, email } =payload;
            const updatedUserDetails = await User.findByIdAndUpdate(
              id,
              { name, email, profilePhoto },
                { new: true, runValidators: true } // Return updated document, validate inputs
              );
          return updatedUserDetails;
      }
const getUserS=()=>{
    const result=User.find().populate([
      {
        path: 'followingIds',
        select: '_id name profilePhoto', // Fetch specific fields
      },
      {
        path: 'followerIds',
        select: '_id name profilePhoto', // Fetch specific fields
      },
    ]);
    return result;
}

const addFollowerS=async(payload:any)=>{
            //console.log(payload.FollowerId,payload.CurrentUserId);      
           // const userDetails=await User.findById(payload.CurrentUserId);
            await User.findByIdAndUpdate(
                payload.CurrentUserId, 
                { $addToSet: { followingIds: payload.FollowerId } }, 
                { new: true }
              );
            await User.findByIdAndUpdate(
                payload.FollowerId, 
                { $addToSet: { followerIds: payload.CurrentUserId } }, 
                { new: true }
              );
            //   const userDetails=await User.findById(payload.CurrentUserId);
}
const deleteFollowerS=async(payload:any)=>{
           // console.log(payload.FollowerId,payload.CurrentUserId);      
           // const userDetails=await User.findById(payload.CurrentUserId);
            await User.findByIdAndUpdate(
                payload.CurrentUserId, 
                { $pull: { followingIds: payload.FollowerId } }, 
                { new: true }
              );
            await User.findByIdAndUpdate(
                payload.FollowerId, 
                { $pull: { followerIds: payload.CurrentUserId } }, 
                { new: true }
              );
            //   const userDetails=await User.findById(payload.CurrentUserId);
}
const updateUserStatusS=async(id:string,payload:string)=>{
  const result=User.findByIdAndUpdate(
      {_id:id},
      {status:'PREMIUM'},
      { new: true })
      ;
  return result;
}
export const UserServices = {
    createUser,
    updateUserS,
    getUserS,
    addFollowerS,
    deleteFollowerS,
    updateUserStatusS

  };