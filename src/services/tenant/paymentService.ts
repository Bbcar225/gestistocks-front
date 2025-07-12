import service from "../../providers/AxiosProvider.ts";

const paymentService = {
	Create: (data: PaymentFormDataInterface): Promise<ResponseApiInterface<PaymentInterface>> => {
		return service.post(`/tenant/payments`, data)
	},
	GetAll: (params: RequestApiInterface = {}): Promise<ResponseApiInterface<ResponsePaginateInterface<PaymentInterface[]>>> => {
		return service.get(`/tenant/payments`, {params})
	},
}

export default paymentService