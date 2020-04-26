import React from "react";
import s from './PreLoader.module.css'

const PreLoader = (props)=>{
    return (
        <div>
            <div className={s.background}></div>
           <div className={s.dots__wrapper}> <div className={s.cssload__dots}>
               <div className={s.cssload__dot}></div>
               <div className={s.cssload__dot}></div>
               <div className={s.cssload__dot}></div>
               <div className={s.cssload__dot}></div>
               <div className={s.cssload__dot}></div>
           </div></div>

            {/*<svg version="1.1" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <defs>*/}
            {/*        <filter id="goo">*/}
            {/*            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="12"></feGaussianBlur>*/}
            {/*            <feColorMatrix in="blur" mode="matrix"*/}
            {/*                           values="1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7"*/}
            {/*                           result="goo"></feColorMatrix>*/}
            {/*        </filter>*/}
            {/*    </defs>*/}
            {/*</svg>*/}
        </div>
    )
}

export default PreLoader
