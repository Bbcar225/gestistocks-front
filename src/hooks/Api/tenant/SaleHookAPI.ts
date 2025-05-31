import {useMutation} from "react-query";
import saleService from "../../../services/tenant/saleService.ts";

export const useSaleCreate = () => {
	return useMutation(saleService.Create)
}