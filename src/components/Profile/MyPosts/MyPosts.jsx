import React, {useEffect, useState} from 'react'
import s from './MyPosts.module.css'

import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import PostBlock from "../../../common/PostBlock/PostBlock";
import {addNewPostThunk, setUserPhotoThunk, setUserPostThunk} from "../../../Redux/Reducer/profile-reducer";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {PhotoCamera} from "@material-ui/icons";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Button from "@material-ui/core/Button";


const MyPosts = React.memo(props => {
        let paramsData = useParams();
        let [id, setUserID] = useState('')
        const authUserID = useSelector(state => state.usersPage.currentUserId)
        const dispatch = useDispatch();
        const postData = useSelector(state => state.profilePage.postData)


        useEffect(() => {

            if (!paramsData.userID) {
                setUserID(authUserID)
            } else {
                setUserID(+paramsData.userID)
            }
            if (id) {
                dispatch(setUserPostThunk(id))
            }

        }, [id])


        return (
            <div>
                {authUserID === id ? <PostBlock userID={authUserID}></PostBlock> : <></>}

               <div className={s.postBlock}>
                   {postData.map((post,index)=>(
                       <ExpansionPanel
                           // className={classes.panel} expanded={expanded === 'panel1'}
                           //             onChange={handleChange('panel1')}
                       >
                           <ExpansionPanelSummary
                               expandIcon={<ExpandMoreIcon/>}
                               aria-controls="panel1c-content"
                               id="panel1c-header"
                           >

                               {post.url?<img src={post.url}/>:<></>}

                           </ExpansionPanelSummary>
                           <ExpansionPanelDetails>
                               //Conents
                           </ExpansionPanelDetails>

                           <Divider/>
                           <ExpansionPanelActions>
                               //add koment
                           </ExpansionPanelActions>
                       </ExpansionPanel>
                   ))}
               </div>



            </div>
        )
    }
)

export default MyPosts
