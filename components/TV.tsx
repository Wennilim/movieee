import { Flex } from '@mantine/core'
import React from 'react'
import Popular from './TV/Popular'
import Trending from './TV/Trending'
import AiringToday from './TV/AiringToday'
import OnAir from './TV/OnAir'
import TopRated from './TV/TopRated'

export default function TV() {
  return (
    <Flex direction='column'>
    <Trending media_type="TV SERIES"/>
    <Popular media_type="TV SERIES" />
    <AiringToday media_type='TV SERIES'/>
    <OnAir media_type='TV SERIES'/>
    <TopRated media_type='TV SERIES'/>
    </Flex>
    
  )
}
