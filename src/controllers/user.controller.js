import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, username, email, password } = req.body;
    // console.log("username :", username);
    // console.log("email:",email);

    if (
        [fullname, username, email, password].some((filed) => filed?.trim() === "")
    ) {
        throw new ApiError(404, "ALL FIELD IS REQIRED:");

    }
    const existingUser = await user.findOne({
        $or: [{ email }, { username }]
    })
    if (existingUser) {
        throw new ApiError(409, "username or email are already exists: ");
    }

    const avatarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "avtar must be required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "avtar must be required");
    }
    const user = await User.create(
        {
            fullname,
            username: username.toLowerCase(),
            email,
            password,
            avatar: avatar.url,
            coverImage: coverImage?.url || ""
        }
    )

   const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500,"someting went to wrong");
        
    }
    return res.status(201).json(
        new apiResponse(200,createdUser,"success")
    )
})

export { registerUser }


