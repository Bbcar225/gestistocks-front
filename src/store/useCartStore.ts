import {create} from "zustand";

interface CartStoreInterface {
	data?: CartInterface,
	setField: ({field, value}: {
		field: keyof CartInterface,
		value?: unknown
	}) => void,
}

const useCartStore = create<CartStoreInterface>((set) => {
	return {
		data: {
			items: []
		},
		
		setField: ({field, value}) => {
			return set((state) => {
				return {
					...state,
					data: {
						...state.data,
						[field]: value
					}
				}
			})
		},
	}
})

export default useCartStore