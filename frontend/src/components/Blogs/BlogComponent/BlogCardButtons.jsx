import React from 'react';
import {
    Button,
    SimpleGrid,
    GridItem,
    HStack,
    IconButton,
    Link
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { LinkIcon, ViewIcon, EditIcon } from '@chakra-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DeleteAlert from '../../Reponses/DeleteAlert';
import { CustomToast } from '../../Reponses/Toast';
export default function BlogCardButtons(props) {
    const {addToast} = CustomToast();
    return (
        <SimpleGrid columns={[1, 2]} width='100%' rowGap={4}>
            <GridItem colSpan={[2, 1]} >
                <HStack justifyContent={['center', 'flex-start']}>
                    <Link as={NavLink} to={`/blog/${props.blog_id}`} width='100%' isExternal = {true}>
                        <Button leftIcon={<ViewIcon />} colorScheme='teal' variant='solid' width='100%'>
                            Read Full Blog
                        </Button>
                    </Link>
                </HStack>
            </GridItem>
            <GridItem colSpan={[2, 1]}>
                <HStack justifyContent={['space-between', 'flex-end']}>
                    <CopyToClipboard text={`https://monkey-app.netlify.app/blog/${props.blog_id}`}>
                        <IconButton variant='ghost' icon={<LinkIcon />} aria-label="copy_to_clipboard" 
                        onClick={()=>addToast({message:'Blog link copied to clipboard', status:'success'})}
                        />
                    </CopyToClipboard>
                    {props.canmodify && <IconButton variant='ghost' icon={<EditIcon />} onClick={props.handleEdit} aria-label="edit" />}
                    {props.canmodify &&<DeleteAlert
                        heading={'Delete Blog'}
                        body={'Are you sure want to delete blog?'}
                        handleDelete = {props.handleDelete}
                        aria-label="delete_blog"
                    />}
                </HStack>
            </GridItem>
        </SimpleGrid>
    )
}
