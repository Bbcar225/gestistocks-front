import service from "../../providers/AxiosProvider.ts";

const supplyService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<SupplyInterface[]>>> => {
		return service.get(`/tenant/suppliers`, {params})
	},
	Create: (data: SupplyFormData): Promise<ResponseApiInterface<SupplyInterface>> => {
		return service.post(`/tenant/suppliers`, data)
	},
	Update: (id: number, data: SupplyFormData): Promise<ResponseApiInterface<SupplyInterface>> => {
		return service.put(`/tenant/suppliers/${id}`, data)
	},
	GetOne: (id: number): Promise<ResponseApiInterface<SupplyInterface>> => {
		return service.get(`/tenant/suppliers/${id}`)
	},
}

export default supplyService