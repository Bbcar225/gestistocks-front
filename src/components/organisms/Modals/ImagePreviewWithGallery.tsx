import {Button, Image, Space} from 'antd';
import {IoIosAddCircle} from 'react-icons/io';
import ImageGalleryModal from './ImageGalleryModal.tsx';
import useGalleryStore from "../../../store/useGalleryStore.ts";
import {useAppStore} from "../../../store/useAppStore.ts";

export default function ImagePreviewWithGallery({...props}) {
	const {gallery} = useGalleryStore()
	const {setOpenModal} = useAppStore()
	
	return (
		<>
			<Space
				direction='vertical'
				size='small'
			>
				{Boolean(gallery) &&
			<Image
				width={200}
				height={200}
				style={{objectFit: 'cover'}}
				src={gallery?.url}
			/>
				}
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => setOpenModal(true)}
					style={{marginBottom: 16}}
				>
					Sélectionner une image
				</Button>
			</Space>
			
			<ImageGalleryModal {...props}/>
		</>
	);
}
