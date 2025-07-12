import service from "../../providers/AxiosProvider.ts";

const paymentService = {
	Create: (data: PaymentFormDataInterface): Promise<ResponseApiInterface<PaymentInterface>> => {
		return service.post(`/tenant/payments`, data)
	},
}

export default paymentService