import {Upload, Modal} from 'antd';
import type {UploadFile} from 'antd/es/upload/interface';
import {useState} from 'react';

export default function ImageUpload({accept, maxCount, ...props}: {accept: string, maxCount: number}) {
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	
	const handleCancel = () => setPreviewOpen(false);
	
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as File);
		}
		
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
	};
	
	const handleChange = ({fileList: newFileList}: { fileList: UploadFile[] }) => {
		setFileList(newFileList);
	};
	
	return (
		<>
			<Upload
				accept={accept}
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				beforeUpload={() => false}
				maxCount={maxCount}
				{...props}
			>
				{fileList.length >= maxCount ? null : (
					<div>
						<div style={{marginTop: 8}}>Ajouter une image</div>
					</div>
				)}
			</Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
				{...props}
			>
				<img alt="image-preview" style={{width: '100%'}} src={previewImage}/>
			</Modal>
		</>
	);
};

const getBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = error => reject(error);
	});
