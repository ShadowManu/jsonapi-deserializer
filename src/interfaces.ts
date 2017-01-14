// Meta Types

export type Multiple<T> = T | T[] | undefined;
export type Hash<T> = { [key: string]: T };
export type Serialization = any;

// Common Types

export interface Document {
  data?: Multiple<Resource>;
  links?: any;
  included?: Resource[] | undefined;
}

export interface ResourceId {
  id: string;
  type: string;
  links?: any;
}

export interface Resource extends ResourceId {
  attributes: any;
  relationships?: Hash<RelationshipObj>;
}

export interface RelationshipObj {
  data?: Multiple<ResourceId>;
  links?: any;
  meta?: any;
}

// Internal Types

export type RelationsHash = Hash<Hash<Resource>>;
