import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverURL"

export const getAllBlogsAPI = async () =>{
    return await commonAPI("GET",`${SERVER_URL}/allblogs`,"")
}

export const removeBlogAPI = async (blogId) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/removeblog/${blogId}`,{})
}

export const editBlogAPI = async (blogId,reqBody) =>{
    console.log(blogId,reqBody);
    return await commonAPI("PUT",`${SERVER_URL}/editblog/${blogId}`,reqBody)
}