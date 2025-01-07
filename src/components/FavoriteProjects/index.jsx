import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const favoriteProjects = ['Project A', 'Project B'];

export default function FavoriteProjects() {
  return (
    <div className='pt-20'>
      <h2 className="text-xl font-bold mb-2">Favorite Projects</h2>
      <List>
        {favoriteProjects.map((project) => (
          <ListItem key={project}>
            <ListItemText primary={project} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

