import { create } from 'zustand';

import getConfiguration from '../../getConfiguration';

import { TEditorConfiguration } from './core';

export type Variable = {
  id: string;
  name: string;
  value: string;
  description?: string;
  source?: 'manual' | 'api';
  apiPath?: string; // JSON path for API mapped variables
};

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedSidebarTab: 'block-configuration' | 'styles' | 'variables';
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
  templatesRefreshKey: number;
  
  // Track current template info
  currentTemplateStatus: 'new' | 'draft' | 'published';
  currentTemplateId: string | null;
  currentTemplateName: string | null;
  
  variables: Variable[];
  apiConfig?: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH';
    headers?: Record<string, string>;
    body?: string;
  };
};

// Determine initial template status based on URL
const getInitialTemplateStatus = (): 'new' | 'draft' | 'published' => {
  const hash = window.location.hash;
  if (hash.includes('#sample/') || hash.includes('#published/')) {
    return 'published';
  }
  if (hash.includes('#draft/')) {
    return 'draft';
  }
  return 'new';
};

const editorStateStore = create<TValue>(() => ({
  document: getConfiguration(window.location.hash),
  selectedBlockId: null,
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',
  selectedScreenSize: 'desktop',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
  templatesRefreshKey: 0,
  currentTemplateStatus: getInitialTemplateStatus(),
  currentTemplateId: null,
  currentTemplateName: null,
  
  variables: [],
  apiConfig: undefined,
}));

export function useDocument() {
  return editorStateStore((s: TValue) => s.document);
}

export function useSelectedBlockId() {
  return editorStateStore((s: TValue) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return editorStateStore((s: TValue) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return editorStateStore((s: TValue) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue['selectedMainTab']) {
  return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
  return editorStateStore((s: TValue) => s.selectedSidebarTab);
}

export function useInspectorDrawerOpen() {
  return editorStateStore((s: TValue) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return editorStateStore((s: TValue) => s.samplesDrawerOpen);
}

export function setSelectedBlockId(selectedBlockId: TValue['selectedBlockId']) {
  const selectedSidebarTab = selectedBlockId === null ? 'styles' : 'block-configuration';
  const options: Partial<TValue> = {};
  if (selectedBlockId !== null) {
    options.inspectorDrawerOpen = true;
  }
  return editorStateStore.setState({
    selectedBlockId,
    selectedSidebarTab,
    ...options,
  });
}

export function setSidebarTab(selectedSidebarTab: TValue['selectedSidebarTab']) {
  return editorStateStore.setState({ selectedSidebarTab });
}

export function resetDocument(
  document: TValue['document'], 
  templateStatus: TValue['currentTemplateStatus'] = 'new',
  templateId: string | null = null,
  templateName: string | null = null
) {
  return editorStateStore.setState({
    document,
    selectedSidebarTab: 'styles',
    selectedBlockId: null,
    currentTemplateStatus: templateStatus,
    currentTemplateId: templateId,
    currentTemplateName: templateName,
  });
}

export function useCurrentTemplateStatus() {
  return editorStateStore((s: TValue) => s.currentTemplateStatus);
}

export function useCurrentTemplateId() {
  return editorStateStore((s: TValue) => s.currentTemplateId);
}

export function useCurrentTemplateName() {
  return editorStateStore((s: TValue) => s.currentTemplateName);
}

export function setCurrentTemplateInfo(id: string | null, name: string | null, status: TValue['currentTemplateStatus']) {
  return editorStateStore.setState({ 
    currentTemplateId: id, 
    currentTemplateName: name,
    currentTemplateStatus: status,
  });
}

export function setCurrentTemplateStatus(status: TValue['currentTemplateStatus']) {
  return editorStateStore.setState({ currentTemplateStatus: status });
}

export function setDocument(document: TValue['document']) {
  const originalDocument = editorStateStore.getState().document;
  return editorStateStore.setState({
    document: {
      ...originalDocument,
      ...document,
    },
  });
}

export function toggleInspectorDrawerOpen() {
  const inspectorDrawerOpen = !editorStateStore.getState().inspectorDrawerOpen;
  return editorStateStore.setState({ inspectorDrawerOpen });
}

export function toggleSamplesDrawerOpen() {
  const samplesDrawerOpen = !editorStateStore.getState().samplesDrawerOpen;
  return editorStateStore.setState({ samplesDrawerOpen });
}

export function useTemplatesRefreshKey() {
  return editorStateStore((s: TValue) => s.templatesRefreshKey);
}

export function triggerTemplatesRefresh() {
  const currentKey = editorStateStore.getState().templatesRefreshKey;
  return editorStateStore.setState({ templatesRefreshKey: currentKey + 1 });
}

export function setSelectedScreenSize(selectedScreenSize: TValue['selectedScreenSize']) {
  return editorStateStore.setState({ selectedScreenSize });
}

// Variable management functions
export function useVariables() {
  return editorStateStore((s: TValue) => s.variables);
}

export function addVariable(variable: Omit<Variable, 'id'>) {
  const id = `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const variables = [...editorStateStore.getState().variables, { ...variable, id }];
  return editorStateStore.setState({ variables });
}

export function updateVariable(id: string, updates: Partial<Variable>) {
  const variables = editorStateStore.getState().variables.map((v: Variable) =>
    v.id === id ? { ...v, ...updates } : v
  );
  return editorStateStore.setState({ variables });
}

export function deleteVariable(id: string) {
  const variables = editorStateStore.getState().variables.filter((v: Variable) => v.id !== id);
  return editorStateStore.setState({ variables });
}

export function useApiConfig() {
  return editorStateStore((s: TValue) => s.apiConfig);
}

export function setApiConfig(apiConfig: TValue['apiConfig']) {
  return editorStateStore.setState({ apiConfig });
}
