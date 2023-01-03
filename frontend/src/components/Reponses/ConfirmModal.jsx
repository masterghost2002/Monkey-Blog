import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    useDisclosure,
    IconButton

} from '@chakra-ui/react';
export default function ConfirmModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();

  const handleClick = ()=>{
    props.handleConfirm();
    onClose();
  }

  return (
    <>
      <IconButton icon={props.icon}  colorScheme='red' onClick={onOpen}/>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {props.heading}
            </AlertDialogHeader>

            <AlertDialogBody>
              {props.body}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red'  onClick = {handleClick} ml={3}>
                {props.confirmBtnName}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}