import React from 'react';
import * as fa from 'react-icons/fa';
import * as ai from 'react-icons/ai';
import * as md from 'react-icons/md';
import * as bi from 'react-icons/bi';

const SidebarData = 
[
    {
        name: "Home",
        path: '/',
        icon: <bi.BiHomeAlt />
    },

    {
        name: "Subscriptions",
        path: '/subscriptions',
        icon: <md.MdOutlineSubscriptions />
    },

    {
        name: 'Liked',
        path: '/liked',
        icon: <ai.AiOutlineHeart /> 
    }
];

export default SidebarData;