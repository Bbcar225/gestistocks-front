import { Modal, Button } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

export default function ImagePreview({
  imageUrl,
  onDelete,
  onAdd,
}: {
  imageUrl?: string;
  onDelete: () => void;
  onAdd: () => void;
}) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: 150, height: 150, border: '1px dashed #d9d9d9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {imageUrl ? (
        <>
          <img
            src={imageUrl}
            alt="preview"
            style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
            onClick={handlePreview}
          />
          <DeleteOutlined
            onClick={onDelete}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              fontSize: 20,
              color: 'red',
              background: 'white',
              borderRadius: '50%',
              padding: 4,
              cursor: 'pointer',
            }}
          />
          <Modal
            open={previewOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="large-preview" style={{ width: '100%' }} src={imageUrl} />
          </Modal>
        </>
      ) : (
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={onAdd}
        >
          Ajouter
        </Button>
      )}
    </div>
  );
}
