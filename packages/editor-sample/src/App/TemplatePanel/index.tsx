import React, { useState } from 'react';

import { MonitorOutlined, PhoneIphoneOutlined, PublishOutlined,SaveOutlined } from '@mui/icons-material';
import { Alert,Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, SxProps, TextField, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { Reader } from '@usewaypoint/email-builder';

import EditorBlock from '../../documents/editor/EditorBlock';
import {
  setCurrentTemplateInfo,
  setSelectedScreenSize,
  triggerTemplatesRefresh,
  useCurrentTemplateId,
  useCurrentTemplateName,
  useCurrentTemplateStatus,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '../../documents/editor/EditorContext';
import { publishTemplate,saveAsDraft } from '../../services/templateStorage';
import ToggleInspectorPanelButton from '../InspectorDrawer/ToggleInspectorPanelButton';
import ToggleSamplesPanelButton from '../SamplesDrawer/ToggleSamplesPanelButton';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import ShareButton from './ShareButton';

export default function TemplatePanel() {
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const currentTemplateStatus = useCurrentTemplateStatus();
  const currentTemplateName = useCurrentTemplateName();
  const currentTemplateId = useCurrentTemplateId();

  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveMode, setSaveMode] = useState<'draft' | 'publish'>('draft');
  const [templateName, setTemplateName] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Check if document has any content (components added)
  const hasContent = (() => {
    const root = document?.root as { data?: { childrenIds?: string[] } } | undefined;
    const childrenIds = root?.data?.childrenIds;
    return childrenIds && childrenIds.length > 0;
  })();

  // Publish button only shows for new/draft templates (not for already published)
  const showPublishButton = currentTemplateStatus !== 'published';

  const handleOpenSaveDialog = (mode: 'draft' | 'publish') => {
    setSaveMode(mode);
    // Pre-fill with current template name if exists
    setTemplateName(currentTemplateName || '');
    setSaveError('');
    setSaveSuccess(false);
    setSaveDialogOpen(true);
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) {
      setSaveError('Please enter a template name');
      return;
    }

    try {
      let savedTemplate;
      const newStatus = saveMode === 'draft' ? 'draft' : 'published';
      
      if (saveMode === 'draft') {
        // Pass existing ID if updating a draft
        savedTemplate = saveAsDraft(document, templateName.trim(), currentTemplateId ?? undefined);
      } else {
        // Pass existing ID if updating, or create new published
        savedTemplate = publishTemplate(document, templateName.trim(), currentTemplateId ?? undefined);
      }

      setSaveSuccess(true);
      setSaveError('');
      triggerTemplatesRefresh();

      // Update URL and context with saved template info
      const hashPrefix = newStatus === 'published' ? 'published' : 'draft';
      window.location.hash = `#${hashPrefix}/${savedTemplate.id}`;
      setCurrentTemplateInfo(savedTemplate.id, savedTemplate.name, newStatus);

      setTimeout(() => {
        setSaveDialogOpen(false);
        setSaveSuccess(false);
      }, 800);
    } catch (err) {
      setSaveError('Failed to save template. Please try again.');
    }
  };

  const handleCloseDialog = () => {
    setSaveDialogOpen(false);
    setTemplateName('');
    setSaveError('');
    setSaveSuccess(false);
  };

  let mainBoxSx: SxProps = {
    height: '100%',
  };
  if (selectedScreenSize === 'mobile') {
    mainBoxSx = {
      ...mainBoxSx,
      margin: '32px auto',
      width: 370,
      height: 800,
      boxShadow:
        'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    };
  }

  const handleScreenSizeChange = (_: unknown, value: unknown) => {
    switch (value) {
      case 'mobile':
      case 'desktop':
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize('desktop');
    }
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <Box sx={mainBoxSx}>
            <EditorBlock id="root" />
          </Box>
        );
      case 'preview':
        return (
          <Box sx={mainBoxSx}>
            <Reader document={document} rootBlockId="root" />
          </Box>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  return (
    <>
      <Stack
        sx={{
          height: 49,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 'appBar',
          px: 1,
        }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <ToggleSamplesPanelButton />
        <Stack px={2} direction="row" gap={2} width="100%" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={2}>
            <MainTabsGroup />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title={hasContent ? 'Save Template' : 'Add components to save'}>
              <span>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<SaveOutlined />}
                  onClick={() => handleOpenSaveDialog('draft')}
                  disabled={!hasContent}
                >
                  Save
                </Button>
              </span>
            </Tooltip>
            {showPublishButton && (
              <Tooltip title={hasContent ? 'Publish Template' : 'Add components to publish'}>
                <span>
                  <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<PublishOutlined />}
                    onClick={() => handleOpenSaveDialog('publish')}
                    disabled={!hasContent}
                  >
                    Publish
                  </Button>
                </span>
              </Tooltip>
            )}
            <DownloadJson />
            <ImportJson />
            <ToggleButtonGroup value={selectedScreenSize} exclusive size="small" onChange={handleScreenSizeChange}>
              <ToggleButton value="desktop">
                <Tooltip title="Desktop view">
                  <MonitorOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mobile">
                <Tooltip title="Mobile view">
                  <PhoneIphoneOutlined fontSize="small" />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
            <ShareButton />
          </Stack>
        </Stack>
        <ToggleInspectorPanelButton />
      </Stack>
      <Box sx={{ height: 'calc(100vh - 49px)', overflow: 'auto', minWidth: 370 }}>{renderMainPanel()}</Box>

      {/* Save Template Dialog */}
      <Dialog open={saveDialogOpen} onClose={handleCloseDialog} maxWidth="xs" fullWidth>
        <DialogTitle>
          {saveMode === 'draft' ? '📝 Save as Draft' : '✅ Publish Template'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            {saveError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {saveError}
              </Alert>
            )}
            {saveSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {saveMode === 'draft' ? 'Saved to Drafts!' : 'Published successfully!'}
              </Alert>
            )}
            <TextField
              autoFocus
              label="Template Name"
              fullWidth
              size="small"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveTemplate();
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} size="small">Cancel</Button>
          <Button 
            onClick={handleSaveTemplate} 
            variant="contained" 
            color={saveMode === 'draft' ? 'primary' : 'success'}
            size="small"
          >
            {saveMode === 'draft' ? 'Save Draft' : 'Publish'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
