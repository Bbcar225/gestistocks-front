import service from "../../providers/AxiosProvider.ts";

const purchaseService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<PurchaseInterface[]>>> => {
		return service.get(`/tenant/purchases`, {params})
	},
	Create: (data: PurchaseFormDataInterface): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.post(`/tenant/purchases`, data)
	}
}

export default purchaseService