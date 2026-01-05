import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ApiIcon from '@mui/icons-material/Api';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

import {
  addVariable,
  deleteVariable,
  setApiConfig,
  updateVariable,
  useApiConfig,
  useVariables,
  Variable,
} from '../../documents/editor/EditorContext';

import BaseSidebarPanel from './ConfigurationPanel/input-panels/helpers/BaseSidebarPanel';

export default function VariablesPanel() {
  const variables = useVariables();
  const apiConfig = useApiConfig();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(apiConfig?.url || '');
  const [apiMethod, setApiMethod] = useState<'GET' | 'POST' | 'PUT' | 'PATCH'>(apiConfig?.method || 'GET');
  const [apiHeaders, setApiHeaders] = useState(JSON.stringify(apiConfig?.headers || {}, null, 2));
  const [apiBody, setApiBody] = useState(apiConfig?.body || '');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleAddVariable = () => {
    setEditingVariable(null);
    setDialogOpen(true);
  };

  const handleEditVariable = (variable: Variable) => {
    setEditingVariable(variable);
    setDialogOpen(true);
  };

  const handleSaveVariable = (name: string, value: string, description: string) => {
    if (editingVariable) {
      updateVariable(editingVariable.id, { name, value, description });
    } else {
      addVariable({ name, value, description, source: 'manual' });
    }
    setDialogOpen(false);
    setEditingVariable(null);
  };

  const handleDeleteVariable = (id: string) => {
    if (confirm('Are you sure you want to delete this variable?')) {
      deleteVariable(id);
    }
  };

  const handleTestApi = async () => {
    setApiError(null);
    try {
      const headers: Record<string, string> = {};
      try {
        const parsedHeaders = JSON.parse(apiHeaders);
        Object.assign(headers, parsedHeaders);
      } catch (e) {
        setApiError('Invalid JSON in headers');
        return;
      }

      const options: RequestInit = {
        method: apiMethod,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      };

      if (apiMethod !== 'GET' && apiBody) {
        try {
          options.body = JSON.parse(apiBody);
        } catch (e) {
          options.body = apiBody;
        }
      }

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      setApiResponse(data);
    } catch (error: any) {
      setApiError(error.message || 'Failed to fetch API');
    }
  };

  const handleMapApiVariables = () => {
    if (!apiResponse) return;

    const mapJsonPaths = (obj: any, prefix = ''): Array<{ path: string; value: any }> => {
      const paths: Array<{ path: string; value: any }> = [];
      for (const key in obj) {
        const currentPath = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          paths.push(...mapJsonPaths(obj[key], currentPath));
        } else {
          paths.push({ path: currentPath, value: obj[key] });
        }
      }
      return paths;
    };

    const paths = mapJsonPaths(apiResponse);
    paths.forEach(({ path, value }) => {
      const existingVar = variables.find((v) => v.apiPath === path);
      if (!existingVar) {
        addVariable({
          name: path.replace(/\./g, '_'),
          value: String(value),
          description: `Mapped from API: ${path}`,
          source: 'api',
          apiPath: path,
        });
      } else {
        updateVariable(existingVar.id, { value: String(value) });
      }
    });

    setApiConfig({
      url: apiUrl,
      method: apiMethod,
      headers: JSON.parse(apiHeaders),
      body: apiBody || undefined,
    });

    alert(`Mapped ${paths.length} variables from API response`);
  };

  return (
    <BaseSidebarPanel title="Variables">
      <Box sx={{ mb: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddVariable}
          sx={{ mb: 1 }}
        >
          Add Variable
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<ApiIcon />}
          onClick={() => setApiDialogOpen(true)}
        >
          Map from API
        </Button>
      </Box>

      {variables.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
          No variables defined. Use <code>{'{{'}</code> in text fields to insert variables.
        </Typography>
      ) : (
        <List>
          {variables.map((variable) => (
            <ListItem
              key={variable.id}
              secondaryAction={
                <Box>
                  <IconButton edge="end" onClick={() => handleEditVariable(variable)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteVariable(variable.id)} size="small">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <code>{'{{' + variable.name + '}}'}</code>
                    {variable.source === 'api' && (
                      <Chip label="API" size="small" color="primary" />
                    )}
                  </Box>
                }
                secondary={variable.description || variable.value}
              />
            </ListItem>
          ))}
        </List>
      )}

      <VariableDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingVariable(null);
        }}
        onSave={handleSaveVariable}
        variable={editingVariable}
      />

      <ApiDialog
        open={apiDialogOpen}
        onClose={() => setApiDialogOpen(false)}
        apiUrl={apiUrl}
        setApiUrl={setApiUrl}
        apiMethod={apiMethod}
        setApiMethod={setApiMethod}
        apiHeaders={apiHeaders}
        setApiHeaders={setApiHeaders}
        apiBody={apiBody}
        setApiBody={setApiBody}
        apiResponse={apiResponse}
        apiError={apiError}
        onTest={handleTestApi}
        onMap={handleMapApiVariables}
      />
    </BaseSidebarPanel>
  );
}

type VariableDialogProps = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, value: string, description: string) => void;
  variable: Variable | null;
};

function VariableDialog({ open, onClose, onSave, variable }: VariableDialogProps) {
  const [name, setName] = useState(variable?.name || '');
  const [value, setValue] = useState(variable?.value || '');
  const [description, setDescription] = useState(variable?.description || '');

  React.useEffect(() => {
    if (variable) {
      setName(variable.name);
      setValue(variable.value);
      setDescription(variable.description || '');
    } else {
      setName('');
      setValue('');
      setDescription('');
    }
  }, [variable, open]);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Variable name is required');
      return;
    }
    onSave(name.trim(), value, description);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{variable ? 'Edit Variable' : 'Add Variable'}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Variable Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          helperText="Use this name in templates: {{variableName}}"
          placeholder="user_name"
        />
        <TextField
          fullWidth
          label="Default Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

type ApiDialogProps = {
  open: boolean;
  onClose: () => void;
  apiUrl: string;
  setApiUrl: (url: string) => void;
  apiMethod: 'GET' | 'POST' | 'PUT' | 'PATCH';
  setApiMethod: (method: 'GET' | 'POST' | 'PUT' | 'PATCH') => void;
  apiHeaders: string;
  setApiHeaders: (headers: string) => void;
  apiBody: string;
  setApiBody: (body: string) => void;
  apiResponse: any;
  apiError: string | null;
  onTest: () => void;
  onMap: () => void;
};

function ApiDialog({
  open,
  onClose,
  apiUrl,
  setApiUrl,
  apiMethod,
  setApiMethod,
  apiHeaders,
  setApiHeaders,
  apiBody,
  setApiBody,
  apiResponse,
  apiError,
  onTest,
  onMap,
}: ApiDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Map Variables from API</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Method</InputLabel>
            <Select value={apiMethod} onChange={(e) => setApiMethod(e.target.value as any)} label="Method">
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="PUT">PUT</MenuItem>
              <MenuItem value="PATCH">PATCH</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://api.example.com/data"
          />
        </Box>

        <TextField
          fullWidth
          label="Headers (JSON)"
          value={apiHeaders}
          onChange={(e) => setApiHeaders(e.target.value)}
          margin="normal"
          multiline
          rows={3}
          helperText='Example: {"Authorization": "Bearer token"}'
        />

        {apiMethod !== 'GET' && (
          <TextField
            fullWidth
            label="Request Body (JSON)"
            value={apiBody}
            onChange={(e) => setApiBody(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
        )}

        {apiError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {apiError}
          </Alert>
        )}

        {apiResponse && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              API Response:
            </Typography>
            <Box
              sx={{
                p: 1,
                bgcolor: 'grey.100',
                borderRadius: 1,
                maxHeight: 200,
                overflow: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}
            >
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onTest} variant="outlined">
          Test API
        </Button>
        {apiResponse && (
          <Button onClick={onMap} variant="contained">
            Map Variables
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

