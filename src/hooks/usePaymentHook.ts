import {usePaymentStore} from "../store/usePaymentStore.ts";
import {usePaymentGetAll} from "./Api/tenant/PaymentHookAPI.ts";
import {cleanQueryParams} from "../utils/reqApiUtils.ts";
import {useState} from "react";

export const useGetListPayment = ({additionalQueryParams = {}, enabled = true}: {
	additionalQueryParams?: PaymentQueryParams,
	enabled?: boolean
}) => {
	const [payments, setPayments] = useState<PaymentInterface[]>([])
	const {queryParams, setFieldPagination} = usePaymentStore()
	
	const reqPaymentGetAll = usePaymentGetAll({
		queryParams: cleanQueryParams({
			...queryParams,
			...additionalQueryParams
		}),
		enabled: enabled,
		onSuccess: ({data}) => {
			setPayments(data?.data || [])
			setFieldPagination({
				field: 'total',
				value: data?.meta?.total || 0
			})
		}
	})
	
	return {
		payments,
		isLoading: reqPaymentGetAll.isLoading
	}
}