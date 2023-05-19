import * as React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

export default function ImageListComp() {
  return (
    // Container to hold the ImageList
    <Box sx={{ width: '100%', maxWidth: 500, height: 450, overflowY: 'scroll' }}>
      {/* ImageList component with masonry variant */}
      <ImageList variant="masonry" cols={3} gap={8}>
        {/* Mapping over itemData array to create ImageListItems */}
        {itemData.map((item) => (
          // Each ImageListItem represents an image item
          <ImageListItem key={item.img}>
            {/* Image element with source, source set, alt text, and lazy loading */}
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}


// Array of image data
const itemData = [
  {
    img: 'https://source.unsplash.com/jCJMzmXN2wY',
    title: 'YellowGirl',
  },
  {
    img: 'https://source.unsplash.com/2q4J5BLhEmI',
    title: 'BlueGirl',
  },
  {
    img: 'https://source.unsplash.com/MkPINODL-Tw',
    title: 'RedLady',
  },
  {
    img: 'https://source.unsplash.com/uO1MUMn0Xzc',
    title: 'ThreeLadies',
  },
  {
    img: 'https://source.unsplash.com/lIxF9Xk6t5E',
    title: 'PinkGirl',
  },
  {
    img: 'https://source.unsplash.com/W9oEn9hbR9s',
    title: 'CheckshirtGuy',
  },
  {
    img: 'https://source.unsplash.com/O3ymvT7Wf9U',
    title: 'BlueGirl',
  },
  {
    img: 'https://source.unsplash.com/zJ7viaRABWQ',
    title: 'PurpleLady',
  },
  {
    img: 'https://source.unsplash.com/LAprsXXH-Nc',
    title: 'YellowLady',
  },
  {
    img: 'https://source.unsplash.com/-W1-1nSZJw8',
    title: 'Mother',
  },
  {
    img: 'https://source.unsplash.com/Iskck0kl210',
    title: 'RustMan',
  },
  {
    img: 'https://source.unsplash.com/i8ODYfxh1j0',
    title: 'Construction Man',
  },
]