import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  Button,
  Input,
  Modal,
  Space,
  Typography,
  message,
  Popconfirm,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  type Document,
  fetchDocuments,
  createDocument,
  deleteDocument,
  updateDocument,
} from '../services/documentApi';

const { Title } = Typography;

export const DocumentListPage: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocName, setNewDocName] = useState('');

  // For renaming
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const docs = await fetchDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
      message.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleCreate = async () => {
    if (!newDocName.trim()) {
      message.warning('Please enter a document name');
      return;
    }
    try {
      await createDocument(newDocName);
      message.success('Document created successfully');
      setIsModalOpen(false);
      setNewDocName('');
      loadDocuments();
    } catch (err) {
      console.error(err);
      message.error('Failed to create document');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id);
      message.success('Document deleted successfully');
      loadDocuments();
    } catch (err) {
      console.error(err);
      message.error('Failed to delete document');
    }
  };

  const openRenameModal = (doc: Document) => {
    setEditingDoc(doc);
    setRenameValue(doc.name || '');
    setRenameModalOpen(true);
  };

  const handleRename = async () => {
    if (!editingDoc) return;
    try {
      await updateDocument(editingDoc.id, renameValue);
      message.success('Document renamed successfully');
      setRenameModalOpen(false);
      setEditingDoc(null);
      loadDocuments();
    } catch (err) {
      console.error(err);
      message.error('Failed to rename document');
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => text || 'Untitled',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Document) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigate(`/edit/${record.id}`)}>
            Edit Content
          </Button>
          <Button onClick={() => openRenameModal(record)}>Rename</Button>
          <Popconfirm
            title="Delete the document"
            description="Are you sure to delete this document?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <Title level={2} style={{ margin: 0 }}>
          Documents
        </Title>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Create New Document
        </Button>
      </div>

      <Table
        dataSource={documents}
        columns={columns}
        rowKey="id"
        loading={loading}
      />

      {/* Create Modal */}
      <Modal
        title="Create New Document"
        open={isModalOpen}
        onOk={handleCreate}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Document Name"
          value={newDocName}
          onChange={(e) => setNewDocName(e.target.value)}
          onPressEnter={handleCreate}
        />
      </Modal>

      {/* Rename Modal */}
      <Modal
        title="Rename Document"
        open={renameModalOpen}
        onOk={handleRename}
        onCancel={() => setRenameModalOpen(false)}
      >
        <Input
          placeholder="New Name"
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onPressEnter={handleRename}
        />
      </Modal>
    </div>
  );
};
