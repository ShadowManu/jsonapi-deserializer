// Meta Types

export type Multiple<T> = T | T[] | undefined;
export type Hash<T> = { [key: string]: T };
export type Serialization = any;

// Common Types

export interface Document {
  data?: Multiple<Resource>;
  links?: any;
  included?: Multiple<Resource>;
}

export interface ResourceId {
  id: string;
  type: string;
  links?: any;
}

export interface Resource extends ResourceId {
  attributes: any;
  relationships?: Hash<Relations>;
}

export interface Relations {
  data?: Multiple<ResourceId>;
  links?: any;
  meta?: any;
}

// Internal Processing Types

export interface PResource {
  resource: any;
  relations: PRelations;
}

export type PRelations = Hash<Multiple<ResourceId>>;
export type RelHash = Hash<Hash<Resource>>;
