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
import {DeleteIcon} from '@chakra-ui/icons';
export default function Alert(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef();

  const handleDeleteButton = ()=>{
    props.handleDelete();
    onClose();
  }

  return (
    <>
      <IconButton icon={<DeleteIcon/>}  colorScheme='red' onClick={onOpen}/>
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
              <Button colorScheme='red'  onClick = {handleDeleteButton} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}