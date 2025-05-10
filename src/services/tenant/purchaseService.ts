import service from "../../providers/AxiosProvider.ts";

const purchaseService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<PurchaseInterface[]>>> => {
		return service.get(`/tenant/purchases`, {params})
	}
}

export default purchaseService