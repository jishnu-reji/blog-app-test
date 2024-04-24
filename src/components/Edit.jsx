import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editBlogAPI } from '../services/allAPI';

function Edit({blogs,reload}) {
    const [show, setShow] = useState(false);
    const [blogData,setBlogData] = useState({
        userId:blogs?.userId,id:blogs?.id,title:blogs?.title,body:blogs?.body
    })

    const handleClose = () =>{
        setShow(false);
        setBlogData({
            userId:blogs?.userId,id:blogs?.id,title:blogs?.title,body:blogs?.body
        })
    } 
    const handleShow = () => setShow(true);

    
  const handleUpdateBlog = async() =>{
    const{userId,id,title,body} = blogData

        if(userId&&id&&title&&body){
            try{

            console.log(blogs._id);
          const result = await editBlogAPI(blogs._id,blogData)
          console.log(result);
          if(result.status==200){
            reload(result)
            handleClose()
          }
          else{
            console.log(result.response);
          }
        }
        catch(err){
          console.log(err);
        }
      }
    }


  return (
    <>
        <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <div className='mb-2'>
                <input type="text" value={blogData.title} onChange={(e)=>setBlogData({...blogData,title:e.target.value})} className="form-control" placeholder='Title'/>
              </div>
              <div className='mb-2'>
                <input type="text" value={blogData.body} className="form-control" placeholder='Content'/>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUpdateBlog} variant="primary">EDIT</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit