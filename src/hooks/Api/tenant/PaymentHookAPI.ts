import {useMutation, useQuery} from "react-query";
import paymentService from "../../../services/tenant/paymentService.ts";

export const paymentQueriesClients = {
	usePaymentGetAll: 'usePaymentGetAll'
}

export const usePaymentCreate = () => {
	return useMutation(paymentService.Create)
}

export const usePaymentGetAll = (params?: HookApiInterface<PaymentQueryParams, ResponseApiInterface<ResponsePaginateInterface<PaymentInterface[]>>>) => {
	return useQuery(
		[paymentQueriesClients.usePaymentGetAll, params?.queryParams],
		() => paymentService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled,
			onSuccess: params?.onSuccess
		}
	)
}

export const usePaymentDelete = (id: number) => {
	return useMutation(() => paymentService.Delete(id))
}