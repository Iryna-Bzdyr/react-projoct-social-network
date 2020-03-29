import React from 'react'
import s from './Profile.module.css'
console.log(s)
const Profile = () => {
    return (
        <div className={s.content}>
            <div className={s.content__background}>

            </div>
            <div className={s.content__inner}>
                <div>
                    ava+description
       </div>
                <div>
                    My post
         <div>
                        New post
              <div>
                            <div>Post 1</div>
                            <div>Post 2</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profile