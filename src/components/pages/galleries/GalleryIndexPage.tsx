import {useEffect, useState} from "react";
import {useAppStore} from "../../../store/useAppStore.ts";
import {Button, Col, Flex, Modal, Row} from "antd";
import {IoIosAddCircle} from "react-icons/io";
import {galleryQueriesClients} from "../../../hooks/Api/tenant/GalleryHookAPI.ts";
import GalleryForm from "../../organisms/forms/GalleryForm.tsx";
import {useQueryClient} from "react-query";
import Gallery from "../../molecules/Gallery.tsx";

export default function CategoryIndexPage() {
	const {setSidebar} = useAppStore()
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	useEffect(() => {
		setSidebar({field: 'title', value: 'Galeries'})
	}, [setSidebar]);
	
	return <Row>
		<Col span={24} className='mb-4'>
			<Flex justify='end'>
				<Button
					type="primary"
					icon={<IoIosAddCircle/>}
					onClick={() => {
						setIsModalOpen(true)
					}}
				>
					Nouvelle image
				</Button>
			</Flex>
		</Col>
		
		<Gallery />
		
		<ModalCreate
			open={isModalOpen}
			close={() => {
				setIsModalOpen(false)
			}}
		/>
	</Row>
}

const ModalCreate = ({open, close}: { open: boolean, close: () => void }) => {
	const queryClient = useQueryClient()
	
	return <Modal
		title="Nouvelle image"
		open={open}
		onCancel={close}
		footer={null}
	>
		<GalleryForm
			onSuccess={() => queryClient.invalidateQueries(galleryQueriesClients.useGalleryGetAll)}
		/>
	</Modal>
};