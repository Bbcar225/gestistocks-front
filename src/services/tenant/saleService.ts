import {SaleFormData, SaleInterface} from "../../interfaces/models/SaleInterface";
import service from "../../providers/AxiosProvider.ts";

const saleService = {
	Create: (data: SaleFormData): Promise<ResponseApiInterface<SaleInterface>> => {
		return service.post(`/tenant/sales`, data)
	},
	GetAll: (params?: RequestApiInterface): Promise<ResponseApiInterface<ResponsePaginateInterface<SaleInterface[]>>> => {
		return service.get(`/tenant/sales`, {params})
	}
}

export default saleService