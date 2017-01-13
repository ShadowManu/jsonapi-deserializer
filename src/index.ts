import { Document, Resource, ResourceIdentifier } from './interfaces';

export function deserialize(doc: Document): any {
  let resources = getResources(doc);
  let relationships = getRelationships(doc);
  return denormalize(resources, relationships);
}

interface ResourceCombinator {
  resource: any;
  relations: { [name: string]: ResourceIdentifier };
}

interface RelationshipHash {
 [type: string]: { [id: string]: Resource };
}

function getResources(doc: Document): ResourceCombinator[] {
  // TODO IMPLEMENT
  return undefined as any;
}

function getRelationships(doc: Document): RelationshipHash {
  // TODO IMPLEMENT
  return undefined as any;
}

function denormalize(resources: ResourceCombinator[], relations: RelationshipHash): any {
  // TODO IMPLEMENT
  return undefined as any;
}
