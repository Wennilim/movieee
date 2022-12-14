import { Flex } from '@mantine/core'
import React from 'react'
import NowPlaying from '../components/NowPlaying'
import Popular from '../components/Popular'
import Trending from '../components/Trending'
import Upcoming from '../components/Upcoming'
import TopRated from '../components/TopRated'

export default function Movie() {
  return (
    <Flex direction='column'>
    <Trending media_type="Movie"/>
    <Popular media_type="Movie" />
    <NowPlaying media_type='Movie'/>
    <Upcoming media_type='Movie'/>
    <TopRated media_type='Movie'/>
    </Flex>
  )
}
