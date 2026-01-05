export { default as buildBlockComponent } from './builders/buildBlockComponent';
export { default as buildBlockConfigurationSchema } from './builders/buildBlockConfigurationSchema';
export { default as buildBlockConfigurationDictionary } from './builders/buildBlockConfigurationDictionary';

export type { BlockConfiguration, DocumentBlocksDictionary, BaseZodDictionary } from './utils';
export { BlockNotFoundError } from './utils';
