import {Button, Popconfirm} from "antd";
import {BiTrash} from "react-icons/bi";

export default function DeleteButton({handleConfirm, loading = false, disabled = false, ...props}: {
	handleConfirm: () => void,
	loading: boolean,
	disabled?: boolean
}) {
	return <Popconfirm
		title="Supprimer"
		description="Voulez-vous le supprimer ?"
		onConfirm={handleConfirm}
		okText="Oui"
		cancelText="Non"
		{...props}
	>
		<Button
			loading={loading}
			icon={<BiTrash/>}
			type='primary'
			disabled={disabled}
			variant='filled'
			color='danger'
		></Button>
	</Popconfirm>
}