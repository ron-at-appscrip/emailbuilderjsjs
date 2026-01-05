import React from 'react';

import { ListItemButton, ListItemIcon,ListItemText } from '@mui/material';

import { resetDocument } from '../../documents/editor/EditorContext';
import getConfiguration from '../../getConfiguration';

type SidebarButtonProps = {
  href: string;
  children: JSX.Element | string;
  icon?: React.ReactNode;
};

export default function SidebarButton({ href, children, icon }: SidebarButtonProps) {
  const handleClick = () => {
    // Sample templates are published, empty template is new
    const status = href.includes('#sample/') ? 'published' : 'new';
    resetDocument(getConfiguration(href), status);
  };
  return (
    <ListItemButton 
      component="a" 
      href={href} 
      onClick={handleClick}
      sx={{ py: 0.5, px: 1 }}
    >
      {icon && (
        <ListItemIcon sx={{ minWidth: 28 }}>
          {icon}
        </ListItemIcon>
      )}
      <ListItemText 
        primary={children}
        primaryTypographyProps={{ 
          variant: 'body2', 
          noWrap: true,
          sx: { color: 'text.primary' }
        }}
      />
    </ListItemButton>
  );
}
