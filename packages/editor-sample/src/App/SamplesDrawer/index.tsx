import React, { useEffect,useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PublishIcon from '@mui/icons-material/Publish';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Drawer, 
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack, 
  Tooltip,
  Typography,
} from '@mui/material';

import { resetDocument, useSamplesDrawerOpen, useTemplatesRefreshKey } from '../../documents/editor/EditorContext';
import { 
  deleteTemplate,
  getDraftTemplates, 
  getPublishedTemplates, 
  SavedTemplate 
} from '../../services/templateStorage';

import SidebarButton from './SidebarButton';

export const SAMPLES_DRAWER_WIDTH = 260;

export default function SamplesDrawer() {
  const samplesDrawerOpen = useSamplesDrawerOpen();
  const templatesRefreshKey = useTemplatesRefreshKey();
  const [draftTemplates, setDraftTemplates] = useState<SavedTemplate[]>([]);
  const [publishedTemplates, setPublishedTemplates] = useState<SavedTemplate[]>([]);
  const [draftsExpanded, setDraftsExpanded] = useState(false);
  const [publishedExpanded, setPublishedExpanded] = useState(true);

  // Load templates when drawer opens or when templates are saved
  useEffect(() => {
    setDraftTemplates(getDraftTemplates());
    setPublishedTemplates(getPublishedTemplates());
  }, [samplesDrawerOpen, templatesRefreshKey]);

  const handleLoadTemplate = (template: SavedTemplate) => {
    // Update URL hash based on template status
    const hashPrefix = template.status === 'published' ? 'published' : 'draft';
    window.location.hash = `#${hashPrefix}/${template.id}`;
    resetDocument(
      template.document as any, 
      template.status === 'published' ? 'published' : 'draft',
      template.id,
      template.name
    );
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTemplate(id);
    refreshTemplates();
  };

  const refreshTemplates = () => {
    setDraftTemplates(getDraftTemplates());
    setPublishedTemplates(getPublishedTemplates());
  };

  const TemplateList = ({ templates, emptyMessage }: { templates: SavedTemplate[], emptyMessage: string }) => (
    <List dense sx={{ py: 0 }}>
      {templates.length === 0 ? (
        <ListItem>
          <ListItemText 
            primary={emptyMessage} 
            primaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
          />
        </ListItem>
      ) : (
        templates.map((template) => (
          <ListItem
            key={template.id}
            disablePadding
            secondaryAction={
              <Tooltip title="Delete">
                <IconButton 
                  edge="end" 
                  size="small" 
                  onClick={(e) => handleDeleteTemplate(template.id, e)}
                  sx={{ opacity: 0.6, '&:hover': { opacity: 1, color: 'error.main' } }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            }
          >
            <ListItemButton onClick={() => handleLoadTemplate(template)} sx={{ py: 0.5, px: 1, pr: 6 }}>
              <ListItemText 
                primary={template.name}
                primaryTypographyProps={{ 
                  variant: 'body2', 
                  noWrap: true,
                  sx: { maxWidth: 140, color: 'text.primary' }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))
      )}
    </List>
  );

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={samplesDrawerOpen}
      sx={{
        width: samplesDrawerOpen ? SAMPLES_DRAWER_WIDTH : 0,
      }}
    >
      <Stack py={1} px={2} width={SAMPLES_DRAWER_WIDTH} justifyContent="space-between" height="100%" sx={{ overflow: 'auto' }}>
        <Stack spacing={2} sx={{ '& .MuiButtonBase-root': { width: '100%', justifyContent: 'flex-start' } }}>
          <Typography variant="h6" component="h1" sx={{ p: 0.75 }}>
            EmailBuilder.js
          </Typography>

          <SidebarButton href="#" icon={<AddIcon fontSize="small" color="primary" />}>Create</SidebarButton>

          {/* Published Templates Dropdown */}
          <Accordion 
            expanded={publishedExpanded} 
            onChange={() => setPublishedExpanded(!publishedExpanded)}
            sx={{ 
              boxShadow: 'none', 
              '&:before': { display: 'none' },
              backgroundColor: 'transparent',
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                minHeight: 40, 
                px: 1,
                '& .MuiAccordionSummary-content': { my: 0, alignItems: 'center', gap: 1 }
              }}
            >
              <PublishIcon fontSize="small" color="success" />
              <Typography variant="body2" fontWeight="medium">Published</Typography>
              <Chip label={publishedTemplates.length + 8} size="small" color="success" sx={{ height: 18, fontSize: 10 }} />
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, py: 0 }}>
              {/* Sample Templates */}
              <List dense sx={{ py: 0 }}>
                <SidebarButton href="#sample/welcome">Welcome email</SidebarButton>
                <SidebarButton href="#sample/one-time-password">One-time passcode (OTP)</SidebarButton>
                <SidebarButton href="#sample/reset-password">Reset password</SidebarButton>
                <SidebarButton href="#sample/order-ecomerce">E-commerce receipt</SidebarButton>
                <SidebarButton href="#sample/subscription-receipt">Subscription receipt</SidebarButton>
                <SidebarButton href="#sample/reservation-reminder">Reservation reminder</SidebarButton>
                <SidebarButton href="#sample/post-metrics-report">Post metrics</SidebarButton>
                <SidebarButton href="#sample/respond-to-message">Respond to inquiry</SidebarButton>
              </List>
              <TemplateList templates={publishedTemplates} emptyMessage="" />
            </AccordionDetails>
          </Accordion>

          {/* Draft Templates Dropdown */}
          <Accordion 
            expanded={draftsExpanded} 
            onChange={() => setDraftsExpanded(!draftsExpanded)}
            sx={{ 
              boxShadow: 'none', 
              '&:before': { display: 'none' },
              backgroundColor: 'transparent',
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                minHeight: 40, 
                px: 1,
                '& .MuiAccordionSummary-content': { my: 0, alignItems: 'center', gap: 1 }
              }}
            >
              <DraftsIcon fontSize="small" color="warning" />
              <Typography variant="body2" fontWeight="medium">Drafts</Typography>
              <Chip label={draftTemplates.length} size="small" sx={{ height: 18, fontSize: 10 }} />
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, py: 0 }}>
              <TemplateList templates={draftTemplates} emptyMessage="No drafts saved" />
            </AccordionDetails>
          </Accordion>

        </Stack>
      </Stack>
    </Drawer>
  );
}
