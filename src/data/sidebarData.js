import React from 'react';
import * as fa from 'react-icons/fa';
import * as ai from 'react-icons/ai';
import * as md from 'react-icons/md';

const SidebarData = 
[
    {
        name: "Home",
        path: '/',
        icon: <ai.AiFillHome />
    },

    {
        name: "Subscriptions",
        path: '/subscriptions',
        icon: <md.MdSubscriptions />
    },

    {
        name: 'Liked',
        path: '/liked',
        icon: <ai.AiFillLike /> 
    }
];

export default SidebarData;