
import React, { useContext, useEffect, useState } from 'react'
import "./Blog.css"
import SinglePost from './SinglePost/SinglePost';
import PageLoading from './PageLoading/PageLoading';
import PostContext from '../../Context/PostContext';
import ReactModal from 'react-modal';
import UserContext from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup"
import convertToBase64 from '../../utils/convertToBase64';
import { v4 as idGenerator } from "uuid";
import { toast } from 'react-toastify';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
}

function Blog() {

    const { posts, setPosts } = useContext(PostContext)

    const [modalIsOpen, setIsOpen] = React.useState(false);


    function closeModal() {
        setIsOpen(false);
    }

    const { user } = useContext(UserContext)
    console.log(user);
    const navigate = useNavigate()
    const [image64, setImage64] = useState(null)
    const [imageErr, setImageErr] = useState("")

    const [loading, setLoading] = useState(false)

    const getBase64Image = async (file) => {
        try {
            const base64 = await convertToBase64(file);
            setImage64(base64);
        }
        catch (error) {
            console.log(error)
        }

    };

    const formik = useFormik({
        initialValues: { title: "", description: "" },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(20, "title is too long")
                .required("this field is required"),
            description: Yup.string()
                .min(100, "description is too short")
                .required('description is required')
        }),
        onSubmit: async (values) => {
            try {
                if (image64) {
                    const { data } = 
                    await axios
                        .post('http://127.0.0.1:8000/add_post', { 
                            _id:idGenerator(),
                            title: values.title,
                            description: values.description,
                            image:image64 })
                     // setPosts([
                    //     {
                    //         id: idGenerator(),
                    //         ...values,
                    //         image: image64,
                    //         likes: [],
                    //         saved: [],
                    //         comments: [],
                    //     },
                    //     ...posts,
                    // ])
                    setImage64(null)
                    setIsOpen(false)
                    formik.resetForm()
                    toast.success("post added", { position: 'top-center' })

                } else {
                    setImageErr("please add an image")
                }
            }
            catch (error) {
                console.log(error)
            }


        },
    }
    )


    return (
        <>
            <div className='post-wrapper'>
                {loading ? (
                    <PageLoading />
                ) : (
                    posts.map((posts) =>
                        <SinglePost post={posts} key={posts.id} />)
                )}
                <div
                    onClick={() => setIsOpen(true)}
                    className='icon-wrapper'>
                    <div className='add-icon'><i className="fa-solid fa-plus"></i></div>
                </div>
                <div>
                    <div>
                        <ReactModal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                        >
                            {user ? (
                                <>
                                    <div className='modal-head'>
                                        <h2>Add Post</h2>
                                        <i onClick={closeModal} class="fa-solid fa-xmark"></i>
                                    </div>


                                    <form onSubmit={formik.handleSubmit}>
                                        <div className='label-wrapper'>
                                            <div>
                                                <div><label>Title</label></div>
                                                <input placeholder='enter the title' name='title' onChange={formik.handleChange} value={formik.values.title} />
                                                <p>{formik.errors.title}</p>
                                            </div>
                                            <div>
                                                <div><label>Description</label></div>
                                                <input placeholder='enter the description' name='description' onChange={formik.handleChange} value={formik.values.description} />
                                                <p>{formik.errors.description}</p>
                                            </div>
                                            <div>
                                                <div><img className='modal-image' src={image64} alt='' /></div>
                                                <div><label>Add image</label></div>
                                                <input type='file' name='image' onChange={e => getBase64Image(e.target.files[0])} /></div>
                                            <p>{imageErr}</p>
                                            <div>
                                                <div><button type='submit'>DONE</button></div>
                                            </div>
                                        </div>

                                    </form>
                                </>) : (

                                <div>
                                    <div className='modal-head'>
                                        <h2>Add Post</h2>
                                        <i onClick={closeModal} class="fa-solid fa-xmark"></i>
                                    </div>
                                    <h5>Please login to add a post</h5>
                                    <button onClick={() => navigate('/login')}>Login</button>
                                </div>
                            )}

                        </ReactModal>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Blog