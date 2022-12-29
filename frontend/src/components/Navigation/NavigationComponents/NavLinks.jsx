import React from 'react'
import { NavLink } from 'react-router-dom';
import { Button, Link, useColorMode } from '@chakra-ui/react';
import { links } from '../../../assests/data';

function returnStyle(colorMode){
    const activeColor = colorMode === 'light'?'black':'white';
    const non_active_color = colorMode === 'light'?'gray.600':'gray.300';
    const hover_color = colorMode === 'light'?'black':'white';
   const style = {
        _non_active_link:{color:non_active_color},
        _active_link:{borderBottom:'3px solid', borderColor:'blue.400', color:activeColor},
        _hover:{color:hover_color}
    };
    return style;
}
export default function NavLinks(props) {
    const {colorMode} = useColorMode();
    const style = returnStyle(colorMode);

    return (
        <>
            {links.map((link, index)=>
                <Link  
                    as ={NavLink}
                    key ={index}
                    to={link.to} 
                    color = {style._non_active_link.color}
                    _activeLink={style._active_link}
                    _hover = {style._hover}
                >
                        <Button variant="nav" onClick={props.onClose}>{link.linkName}</Button>
                </Link>
            )}
        </>
    )
}
