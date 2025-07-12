import {useMutation} from "react-query";
import paymentService from "../../../services/tenant/paymentService.ts";

export const usePaymentCreate = () => {
	return useMutation(paymentService.Create)
}