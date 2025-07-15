import service from "../../providers/AxiosProvider.ts";

const paymentService = {
	Create: (data: PaymentFormDataInterface): Promise<ResponseApiInterface<PaymentInterface>> => {
		return service.post(`/tenant/payments`, data)
	},
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<PaymentInterface[]>>> => {
		return service.get(`/tenant/payments`, {params})
	},
	Delete: (id: number): Promise<ResponseApiInterface<PaymentInterface>> => {
		return service.delete(`/tenant/payments/${id}`)
	},
	Update: (id: number, data: PaymentFormDataInterface): Promise<ResponseApiInterface<PaymentInterface>> => {
		return service.put(`/tenant/payments/${id}`, data)
	}
}

export default paymentService