import service from "../../providers/AxiosProvider.ts";

const contactService = {
	CreateContact: (supplierId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.post(`/tenant/suppliers/${supplierId}/contacts`, data)
	},
	UpdateContact: (supplierId: number, contactId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.put(`/tenant/suppliers/${supplierId}/contacts/${contactId}`, data)
	},
}

const supplierService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<SupplierInterface[]>>> => {
		return service.get(`/tenant/suppliers`, {params})
	},
	Create: (data: SupplierFormData): Promise<ResponseApiInterface<SupplierInterface>> => {
		return service.post(`/tenant/suppliers`, data)
	},
	Update: (id: number, data: SupplierFormData): Promise<ResponseApiInterface<SupplierInterface>> => {
		return service.put(`/tenant/suppliers/${id}`, data)
	},
	GetOne: (id: number): Promise<ResponseApiInterface<SupplierInterface>> => {
		return service.get(`/tenant/suppliers/${id}`)
	},
	...contactService
}

export default supplierService