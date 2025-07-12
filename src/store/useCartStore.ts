import {create} from "zustand";
import dayjs from "dayjs";
import {FormInstance} from "antd";

interface CartStoreInterface {
	data?: CartInterface,
	sale?: SaleInterface,
	
	setFieldData: ({field, value}: {
		field: keyof CartInterface,
		value?: unknown
	}) => void,
	addItem: (item: CartItemInterface) => void,
	updateItem: (item: CartItemInterface) => void,
	removeItem: (item: Partial<CartItemInterface>) => void,
	clearCart: (form?: FormInstance) => void,
	intoCart: (item: Partial<CartItemInterface>) => boolean,
	setData: (data?: CartInterface) => void,
	setSale: (sale?: SaleInterface) => void,
	totalPrice: () => number,
	countItems: () => number,
	setDataBySale: (sale: SaleInterface) => void,
}

const useCartStore = create<CartStoreInterface>((set, get) => {
	return {
		data: {
			items: [],
			date: dayjs() as unknown as Date
		},
		
		setFieldData: ({field, value}) => {
			return set((state) => ({
				...state,
				data: {
					...state.data,
					[field]: value
				}
			}));
		},
		
		addItem: (item) => {
			return set(() => {
				const items = get().data?.items || [];
				
				const itemIndex = items.filter(item => !item?.destroy).findIndex((it) =>
					it.unit_price === item.unit_price &&
					it.product.id === item.product.id
				);
				
				if (itemIndex > -1) {
					items[itemIndex].quantity += item.quantity;
				} else {
					items.push(item);
				}
				
				return {
					data: {
						...get().data,
						items
					}
				};
			});
		},
		
		updateItem: (item) => {
			return set(() => {
				const items = get().data?.items || [];
				
				const itemIndex = items.findIndex((it) =>
					it.unit_price === item.unit_price &&
					it.product.id === item.product.id
				);
				
				if (itemIndex > -1) {
					items[itemIndex] = item;
				}
				
				return {
					data: {
						...get().data,
						items
					}
				};
			});
		},
		
		removeItem: (item) => {
			return set(() => {
				const items = (get().data?.items || []).filter(it =>
					!(it.product.id === item?.product?.id && it.unit_price === item?.unit_price)
				);
				
				return {
					data: {
						...get().data,
						items
					}
				};
			});
		},
		
		clearCart: (form) => {
			return set((state) => {
				form?.setFieldsValue({
					items: [],
					date: dayjs(),
					customer: undefined,
					contact: undefined,
				})
				
				return {
					...state,
					data: {
						...state.data,
						items: [],
						contact: undefined,
						customer: undefined,
						date: dayjs() as unknown as Date
					}
				}
			});
		},
		
		intoCart: (item) => {
			const items = get().data?.items || [];
			return items.some((it) =>
				it.product.id === item?.product?.id &&
				it.unit_price === item?.unit_price &&
				it.quantity === item?.quantity
			);
		},
		
		setData: (data) => {
			return set((state) => {
				return {
					...state,
					data
				}
			})
		},
		
		setSale: (sale) => {
			return set((state) => {
				return {
					...state,
					sale
				}
			})
		},
		
		totalPrice: () => {
			const items = get().data?.items || [];
			
			return items.filter(item => !item.destroy).reduce((sum: number, item) => {
				return sum + (item.unit_price * item.quantity);
			}, 0)
		},
		
		countItems: () => {
			const items = get().data?.items || [];
			
			return items.filter(item => !item.destroy).length || 0
		},
		
		setDataBySale: (sale) => {
			return set((state) => {
				return {
					...state,
					data: {
						date: dayjs(sale?.date) as unknown as Date,
						customer: {
							label: String(sale?.customer.name),
							value: Number(sale?.customer.id)
						},
						contact: {
							label: String(sale?.contact.name),
							value: Number(sale?.contact.id)
						},
						items: sale?.items.map((item) => {
							return {
								product: item.product,
								quantity: item.quantity,
								unit_price: item.unit_price,
								id: item.id
							}
						})
					}
				}
			})
		}
	};
});

export default useCartStore;
