import service from "../../providers/AxiosProvider.ts";

const purchaseItemService = {
	Create: () => {
	
	},
	Update: () => {
	
	},
	Remove: () => {
	
	}
}

const purchaseService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<PurchaseInterface[]>>> => {
		return service.get(`/tenant/purchases`, {params})
	},
	Create: (data: PurchaseFormDataInterface): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.post(`/tenant/purchases`, data)
	},
	GetOne: (id: number): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.get(`/tenant/purchases/${id}`)
	}
}

export default purchaseService