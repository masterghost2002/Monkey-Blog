import { Button, Flex, Text, SimpleGrid, GridItem, Link } from "@chakra-ui/react";
import React from 'react'
import { top_badge } from "../../../assests/data";
export default function TopBadge() {
  return (
    <Flex
      w="100%"
      minHeight={12}
      py={1}
      align="center"
      justify="center"
      bgGradient='linear(to-r, cyan.700, purple.500)'
    >
      <SimpleGrid
        columns={[1, 1, 2]}
        columnGap={2}
        rowGap={2}
      >
        <GridItem align='center'>
          <Text align='center' color='white'>{top_badge.message}</Text>
        </GridItem>
        <GridItem align='center'>
        <Link href = "https://github.com/masterghost2002/Monkey-Blog/releases" isExternal= {true}>
          <Button size='sm'>Changelog V2.2💎</Button>
        </Link>
        </GridItem>
      </SimpleGrid>
    </Flex>
  )
}
