import React, {useEffect} from 'react'
import s from './MyPosts.module.css'
import {Button} from 'reactstrap';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {setUserPostThunk} from "../../../Redux/Reducer/profile-reducer";
import {setCurrentUserThunk} from "../../../Redux/Reducer/user-reducer";


const MyPosts = React.memo(props => {
    let paramsData = useParams();
    let id = +paramsData.userID
    const loginUserID = useSelector(state => state.auth.userID)
    const postData = useSelector(state => state.profilePage.postData)
    const userData = useSelector(state => state.usersPage.users)
    const dispatch = useDispatch();
    useEffect(() => {
        {
            !id ? dispatch(setUserPostThunk(loginUserID)) && dispatch(setCurrentUserThunk(loginUserID)) : dispatch(setUserPostThunk(id)) && dispatch(setCurrentUserThunk(id))
        }
    }, [dispatch])

    // let newPostElement = React.createRef()
    // let addNewPost = () => {
    //     props.addNewPost()
    // }
    // let onPostChange = () => {
    //     let text = newPostElement.current.value
    //     props.upDateNewPostText(text)
    // }

    return (
        <div>
            My post
            <div>
                {/*<div className={s.new__post__area}>*/}
                {/*    <textarea onChange={onPostChange} ref={newPostElement}*/}
                {/*              value={props.newPostText}/>*/}
                {/*    <Button onClick={addNewPost} color="warning">Add</Button>{' '}*/}
                {/*</div>*/}
                New post
                {
                    postData.map(post => <div>
                        <div className={s.wrapper}>
                            <div className={s.avatar}>
                                <img src={userData[0].photo}/>
                            </div>
                            <div>
                                {post.text}
                                {post.likes}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}
)
export default MyPosts
