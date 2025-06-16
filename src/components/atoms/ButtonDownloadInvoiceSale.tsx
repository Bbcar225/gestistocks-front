import {FaFileInvoice} from "react-icons/fa";
import {Button} from "antd";
import {useSaleDownloadInvoice} from "../../hooks/Api/tenant/SaleHookAPI.ts";

export default function ButtonDownloadInvoiceSale({id, text = 'Reçu'}: { id: number, text?: string|null }) {
	const reqSaleDownloadInvoice = useSaleDownloadInvoice()
	
	return <Button
		type='primary'
		icon={<FaFileInvoice/>}
		loading={reqSaleDownloadInvoice.isLoading}
		onClick={() => {
			reqSaleDownloadInvoice.mutate({id}, {
				onSuccess: (res) => {
					try {
						const file = new Blob([res], {type: 'application/pdf'});
						const fileURL = URL.createObjectURL(file);
						
						window.open(fileURL, '_blank');
					} catch (error) {
						console.error(error)
					}
				}
			})
		}}
	>
		{text && text}
	</Button>
}