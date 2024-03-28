import { InboxOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import Dragger from 'antd/lib/upload/Dragger';
import React, { useState } from 'react';

interface ButtonUploadInputProps extends UploadProps {
    name: string;
    label: string;
    acceptExtension?: string[];
    maxFileSize?: number;
    path?: string;
}

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const MultiImageUploadInput: React.FC<ButtonUploadInputProps> = ({
    name,
    label,
    disabled,
    acceptExtension = ['image/png', 'image/jpeg', 'image/jpg'],
    maxFileSize = 2, // 2MB
    path = 'images',
    ...rest
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || '');
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label}
            </label>
            <Dragger
                onPreview={handlePreview}
                name="file"
                multiple
                onChange={(info) => {
                    const { status } = info.file;
                    if (status !== 'uploading') {
                        console.log(info.file, info.fileList);
                    }
                    if (status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully.`);
                    } else if (status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                }}
                onDrop={(e) => console.log('Dropped files', e.dataTransfer.files)}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
                </p>
            </Dragger>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};
