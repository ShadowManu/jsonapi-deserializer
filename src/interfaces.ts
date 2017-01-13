
export interface Document {
  data?: Resource | Resource[];
  links?: any;
  included?: Resource[];
}

export interface ResourceIdentifier {
  id?: string;
  type: string;
  links?: any;
}

export interface Resource extends ResourceIdentifier {
  id?: string;
  type: string;
  attributes: any;
  relationships: { [name: string]: ResourceIdentifier };
}
