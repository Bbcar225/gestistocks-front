import {Modal, Tabs} from 'antd';
import Gallery from "../../molecules/Gallery.tsx";
import {useAppStore} from "../../../store/useAppStore.ts";
import GalleryForm from "../forms/GalleryForm.tsx";
import useGalleryStore from "../../../store/useGalleryStore.ts";

export default function ImageGalleryModal() {
	const {openModal, setOpenModal} = useAppStore()
	const {setGallery} = useGalleryStore()
	
	return <Modal
		title="Sélectionner une image"
		open={openModal}
		onCancel={setOpenModal}
		footer={null}
		width={1000}
	>
		<Tabs
			type="card"
			items={[
				{
					key: '0',
					label: "Gallérie",
					children: <Gallery
						preview={false}
					/>,
				},
				{
					key: '1',
					label: "Nouvelle image",
					children: <GalleryForm
						onSuccess={({gallery}) => {
							setGallery(gallery);
							setOpenModal()
						}}
					/>
				}
			]}
		/>
	</Modal>
}
