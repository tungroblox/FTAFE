import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { constant } from '@core/constant';
import { useFileUploadMutation } from '@hooks/api/file.hook';
import { useMutation } from '@tanstack/react-query';
import { Upload, UploadProps } from 'antd';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import clsx from 'clsx';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { fileApi } from '../../api/file.api';

interface ButtonUploadInputProps extends UploadProps {
    name: string;
    label: string;
    acceptExtension?: string[];
    maxFileSize?: number;
}

export const AvatarUploadInput: React.FC<ButtonUploadInputProps> = ({
    name,
    label,
    disabled,
    acceptExtension = ['image/png', 'image/jpeg', 'image/jpg'],
    maxFileSize = 2, // 2MB

    ...rest
}) => {
    const { setValue, watch } = useFormContext();
    const imageUrl = watch(name);

    React.useEffect(() => {}, []);

    const uploadImageMutation = useMutation(
        async (file: RcFile) => {
            const res = await toast.promise(fileApi.v1PostUpload(file), {
                pending: 'Uploading file',
            });
            return res;
        },
        {
            onSuccess: (data) => {
                setValue(name, data);
            },
            onError: (error) => {
                toast.error('Upload file failed');
            },
        }
    );

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = acceptExtension.includes(file.type);
        if (!isJpgOrPng) {
            toast.error(
                `You can only upload with file extension ${acceptExtension.map((item) => item.replace('image/', '').toUpperCase()).join(', ')}!`
            );
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < maxFileSize;
        if (!isLt2M) {
            toast.error(`The file must smaller than ${maxFileSize}MB!`);
            return false;
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            return;
        }
        if (info.file.status === 'done') {
            uploadImageMutation.mutate(info.file.originFileObj as RcFile);
        }
    };
    const dummyRequest = async ({ file, onSuccess }: any) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                {label}
            </label>
            <Upload {...rest} showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={dummyRequest}>
                <div className="relative">
                    <div className="w-20 h-20 overflow-hidden rounded-full">
                        {imageUrl ? (
                            <img src={imageUrl} alt={name} className={'w-full h-full object-cover'} />
                        ) : (
                            <>
                                <div className="relative w-20 h-20 overflow-hidden rounded-full">
                                    <img src={constant.DEFAULT_IMAGE_URL} alt="deafult" className="object-cover w-full h-full" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Upload>
        </div>
    );
};
