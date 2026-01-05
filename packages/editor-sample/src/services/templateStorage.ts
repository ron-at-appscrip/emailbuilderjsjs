// Template Storage Service using localStorage

export type TemplateStatus = 'draft' | 'published';

export interface SavedTemplate {
  id: string;
  name: string;
  status: TemplateStatus;
  document: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  thumbnail?: string;
}

const STORAGE_KEY = 'email_builder_templates';

// Get all templates from localStorage
export function getAllTemplates(): SavedTemplate[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading templates from localStorage:', error);
    return [];
  }
}

// Get templates by status
export function getTemplatesByStatus(status: TemplateStatus): SavedTemplate[] {
  const templates = getAllTemplates();
  return templates.filter((t) => t.status === status);
}

// Get draft templates
export function getDraftTemplates(): SavedTemplate[] {
  return getTemplatesByStatus('draft');
}

// Get published templates
export function getPublishedTemplates(): SavedTemplate[] {
  return getTemplatesByStatus('published');
}

// Get a single template by ID
export function getTemplateById(id: string): SavedTemplate | null {
  const templates = getAllTemplates();
  return templates.find((t) => t.id === id) || null;
}

// Save template to localStorage
export function saveTemplate(
  document: Record<string, unknown>,
  name: string,
  status: TemplateStatus,
  existingId?: string
): SavedTemplate {
  const templates = getAllTemplates();
  const now = new Date().toISOString();

  if (existingId) {
    // Update existing template
    const index = templates.findIndex((t) => t.id === existingId);
    if (index !== -1) {
      templates[index] = {
        ...templates[index],
        name,
        status,
        document,
        updatedAt: now,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
      return templates[index];
    }
  }

  // Create new template
  const newTemplate: SavedTemplate = {
    id: `template_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    status,
    document,
    createdAt: now,
    updatedAt: now,
  };

  templates.push(newTemplate);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  return newTemplate;
}

// Save as draft
export function saveAsDraft(
  document: Record<string, unknown>,
  name: string,
  existingId?: string
): SavedTemplate {
  return saveTemplate(document, name, 'draft', existingId);
}

// Publish template
export function publishTemplate(
  document: Record<string, unknown>,
  name: string,
  existingId?: string
): SavedTemplate {
  return saveTemplate(document, name, 'published', existingId);
}

// Update template status
export function updateTemplateStatus(id: string, status: TemplateStatus): SavedTemplate | null {
  const templates = getAllTemplates();
  const index = templates.findIndex((t) => t.id === id);
  
  if (index !== -1) {
    templates[index] = {
      ...templates[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
    return templates[index];
  }
  return null;
}

// Delete template
export function deleteTemplate(id: string): boolean {
  const templates = getAllTemplates();
  const filteredTemplates = templates.filter((t) => t.id !== id);
  
  if (filteredTemplates.length !== templates.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTemplates));
    return true;
  }
  return false;
}

// Duplicate template
export function duplicateTemplate(id: string): SavedTemplate | null {
  const template = getTemplateById(id);
  if (template) {
    return saveTemplate(
      template.document,
      `${template.name} (Copy)`,
      'draft'
    );
  }
  return null;
}

// Clear all templates (use with caution)
export function clearAllTemplates(): void {
  localStorage.removeItem(STORAGE_KEY);
}

