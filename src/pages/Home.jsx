import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { getAllBlogsAPI, removeBlogAPI } from '../services/allAPI';
import Edit from '../components/Edit';

function Home() {

    const [everyBlogs,setEveryBlogs] = useState([])
    const [reload,setReload] = useState('')

    const getAllBlogs = async()=>{
        try{
            const result = await getAllBlogsAPI()
            console.log(result);
            if(result.status==200){
                setEveryBlogs(result.data)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleDeleteBlog=async(blogId)=>{
        if(blogId){
          const result = await removeBlogAPI(blogId)
          if(result.status==200){
            getAllBlogs()
          }
          else{
            console.log(result);
          }
        }
      }

    useEffect(()=>{
        getAllBlogs()
    },[reload])

    console.log(everyBlogs);
  return (
    <>
        <Header/>
        <div className="container">
        <div className="container mt-3 mb-5">
        <h2 className="text-center mb-4">Blogs</h2>
        <div className="row">
            {everyBlogs.length>0?everyBlogs.map(blogs=>(
                <div className="col-lg-3">
                <div style={{minHeight:"400px"}} className="card d-flex justify-content-center align-items-center flex-column p-3 mb-4">
                  <h5 className='text-center text-danger fw-bolder'>{blogs?.title}</h5>
                  <p style={{textAlign:"justify"}}>{blogs?.body}</p>
                  <div className='d-flex justify-content-center'>
                    <button onClick={()=>handleDeleteBlog(blogs._id)} className='btn btn-warning me-2'>DELETE</button>
                    <Edit blogs={blogs} reload={setReload}/>
                  </div>
                </div>
                </div>
            ))
            :
            <div>Nothing to display!!!</div>
            }
          
        </div>
      </div>
        </div>
    </>
  )
}

export default Home