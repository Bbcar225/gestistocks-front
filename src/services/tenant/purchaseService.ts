import service from "../../providers/AxiosProvider.ts";

const purchaseItemService = {
	CreateItems: (purchaseId: number, data: PurchaseItemWriteFormData): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.post(`/tenant/purchases/${purchaseId}/items/add`, data)
	},
	UpdateItems: (purchaseId: number, data: PurchaseItemWriteFormData): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.put(`/tenant/purchases/${purchaseId}/items/update`, data)
	},
	RemoveItems: (purchaseId: number, data: PurchaseItemRemoveFormData): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.delete(`/tenant/purchases/${purchaseId}/items/remove`, {
			data
		})
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
	},
	Update: (id: number, data: PurchaseUpdateFormDataInterface): Promise<ResponseApiInterface<PurchaseInterface>> => {
		return service.put(`/tenant/purchases/${id}`, data)
	},
	...purchaseItemService
}

export default purchaseService