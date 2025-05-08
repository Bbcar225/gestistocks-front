import service from "../../providers/AxiosProvider.ts";

const formDataService = {
	GetCountries: (): Promise<ResponseApiInterface<CountryInterface[]>> => {
		return service.get(`/app/form/countries`)
	}
}

export default formDataService