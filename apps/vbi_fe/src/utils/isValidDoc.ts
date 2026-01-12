import type { Doc } from 'yjs';

export const isValidDoc = (doc: Doc) => {
  return (
    doc.getMap('dsl') !== undefined &&
    doc.getMap('dsl').get('connectorId') !== undefined
  );
};
