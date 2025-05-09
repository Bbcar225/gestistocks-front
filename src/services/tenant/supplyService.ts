import service from "../../providers/AxiosProvider.ts";

const contactService = {
	CreateContact: (supplyId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.post(`/tenant/suppliers/${supplyId}/contacts`, data)
	},
	UpdateContact: (supplyId: number, contactId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.put(`/tenant/suppliers/${supplyId}/contacts/${contactId}`, data)
	},
}

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
	...contactService
}

export default supplyService