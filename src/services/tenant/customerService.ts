import service from "../../providers/AxiosProvider.ts";

const contactService = {
	CreateContact: (customerId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.post(`/tenant/customers/${customerId}/contacts`, data)
	},
	UpdateContact: (customerId: number, contactId: number, data: ContactFormData): Promise<ResponseApiInterface<ContactInterface>> => {
		return service.put(`/tenant/customers/${customerId}/contacts/${contactId}`, data)
	},
}

const customerService = {
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<CustomerInterface[]>>> => {
		return service.get(`/tenant/customers`, {params})
	},
	Create: (data: CustomerFormData): Promise<ResponseApiInterface<CustomerInterface>> => {
		return service.post(`/tenant/customers`, data)
	},
	Update: (id: number, data: CustomerFormData): Promise<ResponseApiInterface<CustomerInterface>> => {
		return service.put(`/tenant/customers/${id}`, data)
	},
	GetOne: (id: number): Promise<ResponseApiInterface<CustomerInterface>> => {
		return service.get(`/tenant/customers/${id}`)
	},
	...contactService
}

export default customerService