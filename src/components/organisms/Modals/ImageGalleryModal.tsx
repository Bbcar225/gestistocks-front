import {Modal, Tabs} from 'antd';
import Gallery from "../../molecules/Gallery.tsx";
import {useAppStore} from "../../../store/useAppStore.ts";
import GalleryForm from "../Forms/GalleryForm.tsx";
import useGalleryStore from "../../../store/useGalleryStore.ts";

export default function ImageGalleryModal({...props}) {
	const {openModal, setOpenModal} = useAppStore()
	const {setGallery} = useGalleryStore()
	
	return <Modal
		title="Sélectionner une image"
		open={openModal}
		onCancel={() => setOpenModal(false)}
		footer={null}
		width={1000}
		{...props}
	>
		<Tabs
			type="card"
			items={[
				{
					key: '0',
					label: "Gallérie",
					children: <Gallery
						preview={false}
						{...props}
					/>,
				},
				{
					key: '1',
					label: "Nouvelle image",
					children: <GalleryForm
						onSuccess={({gallery}) => {
							setGallery(gallery);
							setOpenModal(false)
						}}
						{...props}
					/>
				}
			]}
		/>
	</Modal>
}
