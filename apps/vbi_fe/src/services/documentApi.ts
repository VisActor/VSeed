const API_BASE = '/api/v1/document';

export interface Document {
  id: string;
  name: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any; // data is returned as object { type: 'Buffer', data: [...] } from JSON
  createdAt: string;
  updatedAt: string;
}

export const fetchDocuments = async (): Promise<Document[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch documents');
  const result = await res.json();
  return result.data;
};

export const createDocument = async (name: string): Promise<Document> => {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create document');
  const result = await res.json();
  return result.data;
};

export const deleteDocument = async (id: string): Promise<void> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete document');
};

export const updateDocument = async (
  id: string,
  name: string,
): Promise<Document> => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update document');
  const result = await res.json();
  return result.data;
};
