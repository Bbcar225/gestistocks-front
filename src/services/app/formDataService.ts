import service from "../../providers/AxiosProvider.ts";

const formDataService = {
	GetCountries: (): Promise<ResponseApiInterface<CountryInterface[]>> => {
		return service.get(`/app/form/countries`)
	},
	GetPositions: (): Promise<ResponseApiInterface<PositionInterface[]>> => {
		return service.get(`/app/form/contact-positions`)
	},
	GetTypesGallery: (): Promise<ResponseApiInterface<TGalleryType[]>> => {
		return service.get(`/app/form/galleries/types`)
	}
}

export default formDataService