import {SaleFormData, SaleInterface} from "../../interfaces/models/SaleInterface";
import service from "../../providers/AxiosProvider.ts";

const saleService = {
	Create: (data: SaleFormData): Promise<ResponseApiInterface<SaleInterface>> => {
		return service.post(`/tenant/sales`, data)
	}
}

export default saleService