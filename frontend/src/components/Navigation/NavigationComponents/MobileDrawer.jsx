import { useDisclosure, Flex,  Button, HStack} from "@chakra-ui/react";
import Drawer from './Drawer';
import { IoMdMenu } from 'react-icons/io';
import React from "react";
import NavLinks from "./NavLinks";
export default function MobileDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(); return (
        <Flex display={{ base: "flex", md: "none" }} >
            <Button ref={btnRef} onClick={onOpen} bg='transparent' aria-label="userProfile">
                <IoMdMenu size="26px"  />
            </Button>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <HStack alignItems="left">
                        <NavLinks onClose={onClose}/>
                </HStack>
            </Drawer>
        </Flex>
    );
};