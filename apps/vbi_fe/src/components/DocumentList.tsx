import React, { useEffect, useState, useCallback } from 'react';
import {
  type Document,
  fetchDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
} from '../services/documentApi';
import { Button } from 'antd';

interface DocumentListProps {
  onSelect: (id: string) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({ onSelect }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [newDocName, setNewDocName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const loadDocuments = useCallback(async () => {
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
      alert('Failed to load documents');
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadDocuments();
  }, [loadDocuments]);

  const handleCreate = async () => {
    if (!newDocName.trim()) return;
    try {
      await createDocument(newDocName);
      setNewDocName('');
      loadDocuments();
    } catch (err) {
      console.error(err);
      alert('Failed to create document');
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteDocument(id);
      loadDocuments();
    } catch (err) {
      console.error(err);
      alert('Failed to delete document');
    }
  };

  const startEdit = (doc: Document, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(doc.id);
    setEditName(doc.name || '');
  };

  const saveEdit = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editingId) return;
    try {
      await updateDocument(editingId, editName);
      setEditingId(null);
      loadDocuments();
    } catch (err) {
      console.error(err);
      alert('Failed to update document');
    }
  };

  const cancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(null);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Documents</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          value={newDocName}
          onChange={(e) => setNewDocName(e.target.value)}
          placeholder="New Document Name"
          style={{ marginRight: 10, padding: 5 }}
        />
        <button onClick={handleCreate} style={{ padding: '5px 10px' }}>
          Create
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {documents.map((doc) => (
          <li
            key={doc.id}
            onClick={() => onSelect(doc.id)}
            style={{
              padding: 10,
              border: '1px solid #ccc',
              marginBottom: 5,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {editingId === doc.id ? (
              <div>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <Button>{doc.name || 'Untitled'}</Button>
            )}

            <div>
              {!editingId && (
                <button
                  onClick={(e) => startEdit(doc, e)}
                  style={{ marginRight: 5 }}
                >
                  Edit
                </button>
              )}
              <button
                onClick={(e) => handleDelete(doc.id, e)}
                style={{ color: 'red' }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
