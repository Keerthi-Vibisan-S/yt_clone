import React from 'react';
import { NavLink } from 'react-router-dom';
import * as fa from 'react-icons/fa'; 
import * as ai from 'react-icons/ai';
import * as md from 'react-icons/md';
import SidebarData from '../data/sidebarData.js';

export default function Sidebar()
{
    return(
        <section className='d-flex flex-column flex-shrink-0 bg-light fixed-component height-100 bg-light'>
            <ul className='nav nav-pills nav-flush flex-column mb-auto text-center'>

                {SidebarData.map((item, index) => {
                    return(
                        <li key={index} className='my-nav-item'>
                            <NavLink to={item.path}  exact='true' className='border-bottom yt-red my-nav-link-hover' activeclass='my-sidebar-active'><h3>{item.icon}</h3></NavLink>
                        </li>
                    );
                })}

            </ul>
        </section>
    );
}

