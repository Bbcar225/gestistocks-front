import {create} from "zustand";

interface UnitEquivalenceStoreInterface {
	unitEquivalence?: UnitEquivalenceInterface
	setUnitEquivalence: (unitEquivalence?: UnitEquivalenceInterface) => void
}

const unitEquivalenceStore = create<UnitEquivalenceStoreInterface>((set) => {
	return {
		unitEquivalence: undefined,
		setUnitEquivalence: ((unitEquivalence) => {
			return set((state) => {
				return {
					...state,
					unitEquivalence
				}
			})
		})
	}
})

export default unitEquivalenceStore

