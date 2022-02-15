import React from 'react';
import { NavLink } from 'react-router-dom';
import * as fa from 'react-icons/fa'; 
import * as ai from 'react-icons/ai';
import * as bi from 'react-icons/bi';
import SidebarData from '../data/sidebarData.js';

export default function Sidebar()
{
    //console.log(session);

    //Google Logout
    function logout(response)
    {
        //alert("Hello");
        localStorage.removeItem('authDetails');
        localStorage.removeItem('userSno');
        window.location.reload(true);
        }

    return(
        <aside id="sidebar" className="sidebar search-bar-show">
            <p>Menus</p>
            <ul className="sidebar-nav border-bottom" id="sidebar-nav">

            {SidebarData.map((item, index) => {
                        return(
                            <li className="nav-item my-nav-hover py-2 px-3 my-1" key={index}>
                                <NavLink to={item.path} exact='true' className={(navData) => navData.isActive?"text-danger":"sidebar-navLink"}><span className='sidebar-icon'>{item.icon}</span><span className='my-Sidebar-text'>{item.name}</span></NavLink>
                            </li>
                            
                        );
                })}
            </ul>

            <div className='mt-3'>
                <p>User Settings</p>
                <button className='btn text-dark fw-bold' onClick={() => logout()}><bi.BiLogOut size={26} className="fw-bold" /> Logout</button>
            </div>
        </aside>
    
    )
}

