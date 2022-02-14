import React from 'react';
import { NavLink } from 'react-router-dom';
import * as fa from 'react-icons/fa'; 
import * as ai from 'react-icons/ai';
import * as md from 'react-icons/md';
import SidebarData from '../data/sidebarData.js';
import session from './navbar';

export default function Sidebar()
{
    console.log(session);

    return(
        <aside id="sidebar" className="sidebar search-bar-show">

        <ul className="sidebar-nav" id="sidebar-nav">

          {SidebarData.map((item, index) => {
                    return(
                        <li className="nav-item my-nav-hover py-2 px-3 my-1" key={index}>
                            <NavLink to={item.path} exact='true' className={(navData) => navData.isActive?"text-danger":"sidebar-navLink"}><span className='sidebar-icon'>{item.icon}</span><span className='my-Sidebar-text'>{item.name}</span></NavLink>
                        </li>
                        
                    );
            })}
        </ul>
        </aside>
    
    )
    // return(
    //     <section className='d-flex flex-column flex-shrink-0 bg-light fixed-component height-100 bg-light'>
    //         <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>

                // {SidebarData.map((item, index) => {
                //     return(
                //         <li key={index} className='my-nav-item'>
                //             <NavLink to={item.path}  exact='true' className={(navData) => navData.isActive?"my-sidebar-active my-nav-link-hover":'border-bottom yt-red my-nav-link-hover'}><h3>{item.icon}</h3></NavLink>
                //         </li>
                //     );
                // })}

    //         </ul>
    //     </section>
    // );
}

