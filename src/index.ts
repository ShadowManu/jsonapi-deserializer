import { assign, isArray, mapValues, merge } from 'lodash';

import {
  Document, Multiple, Serialization,
  Resource, ResourceId, PResource,
  Relations, PRelations, RelHash
} from './interfaces';

export function deserialize(doc: Document): Serialization {
  let pResources = getResources(doc);
  let relationships = getRelationships(doc);
  return denormalize(pResources, relationships);
}

function getResources(doc: Document): Multiple<PResource> {
  // Null Case
  if (!doc.data) {
    return undefined;

  // Collection Case
  } else if (isArray(doc.data)) {
    return doc.data.map((resource) => processResource(resource));

  // Single Case
  } else {
    return processResource(doc.data);
  }
}

function processResource(resource: Resource): PResource {
  let { id, attributes, relationships = {} }: Resource = resource;

  let relations: PRelations = mapValues(relationships, (rels: Relations): Multiple<ResourceId> => rels.data);

  return { resource: assign({}, attributes, { id }), relations };
}

function getRelationships(doc: Document): RelHash {
  let result: RelHash = {};

  arrayify(doc.included).forEach(({ id, type, attributes }: Resource) => {
    merge(result, { [type]: { [id]: assign({}, attributes, { id }) } });
  });

  return result;
}

function denormalize(pResources: Multiple<PResource>, relations: RelHash): any {
  if (!pResources) {
    return undefined;

  } else if (isArray(pResources)) {
    return pResources.map((pResource) => denormalize(pResource, relations));

  } else {
    let pResource = pResources;

    return assign(pResource.resource, mapValues(pResource.relations, (rels: Multiple<ResourceId>) => {
      // Null Case
      if (!rels) {
        return undefined;

        // Collection Case
      } else if (isArray(rels)) {
        return rels.map((rel) => findRelation(rel, relations));

        // Single Case
      } else {
        return findRelation(rels, relations);
      }
    }));
  }
}

function findRelation(rel: ResourceId, relations: RelHash) {
  return relations[rel.type][rel.id];
}

// Helper functions

function arrayify<T>(data: Multiple<T>): T[] {
  if (!data) { return [];

  } else if (isArray(data)) { return data;

  } else { return [data]; }
}
