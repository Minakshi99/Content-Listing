import React from 'react';
import { Grid } from '@mui/material';
import Thumbnail from './Thumbnail';

const BASE_IMAGE_API_URL = 'https://test.create.diagnal.com/images/';


function ContentGrid({ contentData }) {
  return (
    <Grid container spacing={2}>
      {contentData.map((item) => (
        <Grid item key={item.id} xs={4} sm={4} md={4}>
          <Thumbnail title={item.name} imageUrl={`${BASE_IMAGE_API_URL}${item['poster-image']}`} style={{ aspectRatio: '2/3' }}/>
        </Grid>
      ))}
    </Grid>
  );
}

export default ContentGrid;
