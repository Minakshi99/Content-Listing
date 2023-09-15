import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function Thumbnail(props) {
  const { title, imageUrl } = props;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={title}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
      </CardContent>
    </Card>
  );
}

export default Thumbnail;
