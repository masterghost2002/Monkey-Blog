import React, { useState } from "react";
import { UPDATE_THEME } from '../BackendResponses/backendRequest';
import { useSelector } from 'react-redux';
import { CustomToast } from '../Reponses/Toast';
import { useDispatch } from 'react-redux';
import { authActions } from '../../Store';
import { logo_lg, logo_sm } from "../../assests/data";
import {
  Avatar,
  Flex,
  Button,
  HStack,
  chakra,
  Menu,
  MenuDivider,
  MenuItem,
  MenuButton,
  Center,
  MenuList,
  useColorMode,
  Box,
  IconButton,
  Text,
  Link
} from '@chakra-ui/react';
import { NavLink } from "react-router-dom";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import NavLinks from "./NavigationComponents/NavLinks";
import { avatar_img } from "../../assests/data";
import MobileDrawer from './NavigationComponents/MobileDrawer';
export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [navShadow, setNavShadow] = useState(false);
  const dispatch = useDispatch();
  const {addToast} = CustomToast();
  const userInfo = useSelector((state) => state.userInfo); // return useName, userId


  window.onscroll = function () {
    if (window.pageYOffset > 40 && navShadow === false)
      setNavShadow(true);
    else if (window.pageYOffset < 40 && navShadow === true)
      setNavShadow(false);
  }

  const handleThemeSide = async () => {
    const isDark = colorMode === 'dark';
    toggleColorMode();
    // color mode is not changing suddenly so using the if else condition in db request
    const requestData = {
      userId: userInfo.userId,
      themeSide: isDark?'light':'dark', // setting the theme side based on the current present theme
    }
    const response = await UPDATE_THEME(requestData);
    // if the response status is 200 it means we successfully updated the theme
    if (response.status === 200) {
      const auth_access_token = await response.data.accessToken;
      localStorage.removeItem("auth_access_token");
      localStorage.setItem("auth_access_token", auth_access_token);
      return;
    }
    // else we show the error here using toast
    addToast({ title: 'Theme Update Failed!', message: 'Unable to update theme in database reverting back changes', status: 'warning' });
    toggleColorMode();
  }

  return (
    <chakra.header id="header" position={navShadow?'fixed':'absolute'} w='100%' top={navShadow?0:'auto'} zIndex={3} >
      <Flex as="header"
        w="100%"
        px="6"
        py={['4', '2']}
        align="center"
        justify="space-between"
        bg={colorMode === 'light' ? 'white' : 'gray.800'}
        boxShadow={navShadow ? 'lg' : 'none'}
      >
        <MobileDrawer display={{ base: "flex", md: "none" }} bg='transparent' />

        {/* hero secttion */}
        <Link as = {NavLink} _hover={{border:'0px'}} to='/blogs'>
          <HeroSection />
        </Link>

        {/* links navigation */}
        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }} bg='transparent' >
          <NavLinks />
        </HStack>


        <HStack>
          <Box >
            <IconButton
              bg='transparent'
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon color='yellow.300' />}
              onClick={handleThemeSide}
              aria-label="themeSwitcher"
            />
          </Box>

          {/* User Profile menu */}
          <Menu >
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              aria-label="menu"
              minW={0}>
              <Avatar
                size={'sm'}
                src={avatar_img.link}
                alt = 'www.chakraui.com'
              />
            </MenuButton>
            <MenuList alignItems={'center'} >
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={avatar_img.link}
                  alt = 'www.chakraui.com'
                />
              </Center>
              <br />
              <Center>
                <Text fontWeight='bold' fontSize='2xl'>{userInfo.userName}</Text>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem disabled>Account Settings</MenuItem>
              <MenuItem type='Button' onClick={() => dispatch(authActions.logout())}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
const HeroSection = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <HStack display={{ base: 'none', md: 'flex' }}>
        <Text fontSize='xl' fontWeight='bold' color='blue.500'>{logo_lg.firstPart}</Text><Text fontSize='xl' fontWeight='bold' color={colorMode === 'light' ? 'black' : 'white'}>{logo_lg.secondPart}</Text>
      </HStack>
      <HStack display={{ base: 'flex', md: 'none' }}>
        <Text fontSize='xl' fontWeight='bold' color='blue.500'>{logo_sm.firstPart}</Text><Text fontSize='xl' fontWeight='bold' color={colorMode === 'light' ? 'black' : 'white'}>{logo_sm.secondPart}</Text>
      </HStack>
    </>
  )
}