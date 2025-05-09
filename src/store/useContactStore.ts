import {create} from "zustand";

interface ContactStoreInterface {
	contact?: ContactInterface,
	
	setContact: (contact?: ContactInterface) => void
}

const useContactStore = create<ContactStoreInterface>((set) => {
	return {
		contact: undefined,
		
		setContact: (contact?: ContactInterface) => {
			return set((state) => {
				return {
					...state,
					contact
				}
			})
		}
	}
})

export default useContactStore