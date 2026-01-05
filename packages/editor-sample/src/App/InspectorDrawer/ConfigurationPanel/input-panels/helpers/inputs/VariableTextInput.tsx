import React, { useEffect,useRef, useState } from 'react';

import { Box,List, ListItem, ListItemText, Paper, Popper, TextField, TextFieldProps } from '@mui/material';

import { useVariables } from '../../../../../../documents/editor/EditorContext';

type VariableTextInputProps = Omit<TextFieldProps, 'onChange' | 'value' | 'defaultValue'> & {
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  enableVariables?: boolean;
};

export default function VariableTextInput({
  value: controlledValue,
  defaultValue = '',
  onChange,
  enableVariables = true,
  ...textFieldProps
}: VariableTextInputProps) {
  const variables = useVariables();
  // Always use internal state, initialized from defaultValue (like original TextInput)
  const [value, setValue] = useState(defaultValue);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const suggestionsRef = useRef<string[]>([]);
  const selectedIndexRef = useRef(0);
  const open = Boolean(anchorEl) && suggestions.length > 0;

  // Keep refs in sync with state
  useEffect(() => {
    suggestionsRef.current = suggestions;
  }, [suggestions]);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Update value when defaultValue changes (when switching blocks)
  useEffect(() => {
    if (controlledValue === undefined) {
      setValue(defaultValue);
    }
  }, [defaultValue, controlledValue]);

  // If controlled, sync with external value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  // Check for variable autocomplete on value change
  useEffect(() => {
    if (!enableVariables || !inputRef.current) return;

    const textarea = inputRef.current;
    const cursorPosition = textarea.selectionStart || 0;
    const textBeforeCursor = value.substring(0, cursorPosition);

    // Check if we're inside {{...}}
    const lastOpen = textBeforeCursor.lastIndexOf('{{');
    const lastClose = textBeforeCursor.lastIndexOf('}}');

    if (lastOpen > lastClose) {
      // We're inside a {{...}} block
      const textAfterOpen = textBeforeCursor.substring(lastOpen + 2);
      const searchTerm = textAfterOpen.toLowerCase();

      // Filter variables that match
      const matchingVars = variables
        .filter((v) => v.name.toLowerCase().includes(searchTerm))
        .map((v) => v.name);

      if (matchingVars.length > 0) {
        setSuggestions(matchingVars);
        setSelectedIndex(0);
        setAnchorEl(textarea);
      } else {
        setAnchorEl(null);
        setSuggestions([]);
      }
    } else {
      // Check if user just typed {{
      if (textBeforeCursor.endsWith('{{')) {
        // Show all variables
        const allVars = variables.map((v) => v.name);
        setSuggestions(allVars);
        setSelectedIndex(0);
        setAnchorEl(textarea);
      } else {
        setAnchorEl(null);
        setSuggestions([]);
      }
    }
  }, [value, enableVariables, variables]);

  useEffect(() => {
    if (!enableVariables) return;

    const textarea = inputRef.current;
    if (!textarea) return;

    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as KeyboardEvent;
      // Check if suggestions are open by checking if anchorEl is set
      const currentSuggestions = suggestionsRef.current;
      if (!anchorEl || currentSuggestions.length === 0) return;

      if (keyboardEvent.key === 'ArrowDown') {
        keyboardEvent.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev < currentSuggestions.length - 1 ? prev + 1 : prev;
          selectedIndexRef.current = newIndex;
          return newIndex;
        });
      } else if (keyboardEvent.key === 'ArrowUp') {
        keyboardEvent.preventDefault();
        setSelectedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : 0;
          selectedIndexRef.current = newIndex;
          return newIndex;
        });
      } else if (keyboardEvent.key === 'Enter' || keyboardEvent.key === 'Tab') {
        keyboardEvent.preventDefault();
        const currentIndex = selectedIndexRef.current;
        if (currentIndex < currentSuggestions.length) {
          const varName = currentSuggestions[currentIndex];
          const textarea = inputRef.current;
          if (textarea) {
            const cursorPosition = textarea.selectionStart || 0;
            const currentValue = (textarea as HTMLInputElement | HTMLTextAreaElement).value;
            const textBeforeCursor = currentValue.substring(0, cursorPosition);
            const textAfterCursor = currentValue.substring(cursorPosition);
            const lastOpen = textBeforeCursor.lastIndexOf('{{');
            const lastClose = textBeforeCursor.lastIndexOf('}}');

            if (lastOpen > lastClose) {
              const beforeVar = currentValue.substring(0, lastOpen + 2);
              const afterVar = textAfterCursor;
              const newValue = beforeVar + varName + '}}' + afterVar;
              setValue(newValue);
              onChange(newValue);

              setTimeout(() => {
                const newCursorPos = lastOpen + 2 + varName.length + 2;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
                setAnchorEl(null);
                setSuggestions([]);
              }, 0);
            }
          }
        }
      } else if (keyboardEvent.key === 'Escape') {
        setAnchorEl(null);
        setSuggestions([]);
      }
    };

    textarea.addEventListener('keydown', handleKeyDown);

    return () => {
      textarea.removeEventListener('keydown', handleKeyDown);
    };
  }, [enableVariables, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  const insertVariable = (varName: string) => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const cursorPosition = textarea.selectionStart || 0;
    const currentValue = (textarea as HTMLInputElement | HTMLTextAreaElement).value;
    const textBeforeCursor = currentValue.substring(0, cursorPosition);
    const textAfterCursor = currentValue.substring(cursorPosition);
    const lastOpen = textBeforeCursor.lastIndexOf('{{');
    const lastClose = textBeforeCursor.lastIndexOf('}}');

    if (lastOpen > lastClose) {
      const beforeVar = currentValue.substring(0, lastOpen + 2);
      const afterVar = textAfterCursor;
      const newValue = beforeVar + varName + '}}' + afterVar;
      setValue(newValue);
      onChange(newValue);

      setTimeout(() => {
        const newCursorPos = lastOpen + 2 + varName.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        setAnchorEl(null);
        setSuggestions([]);
      }, 0);
    }
  };

  return (
    <>
      <TextField
        {...textFieldProps}
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        helperText={
          enableVariables ? (
            <Box component="span">
              {textFieldProps.helperText}
              {textFieldProps.helperText && ' • '}
              Type <code>{'{{'}</code> to insert variables
            </Box>
          ) : (
            textFieldProps.helperText
          )
        }
      />
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 4],
            },
          },
        ]}
      >
        <Paper elevation={3} sx={{ maxWidth: 300, maxHeight: 200, overflow: 'auto' }}>
          <List dense>
            {suggestions.map((varName, index) => {
              const variable = variables.find((v) => v.name === varName);
              return (
                <ListItem
                  key={varName}
                  selected={index === selectedIndex}
                  onClick={() => insertVariable(varName)}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <code>{'{{' + varName + '}}'}</code>
                      </Box>
                    }
                    secondary={variable?.description || variable?.value}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Popper>
    </>
  );
}

