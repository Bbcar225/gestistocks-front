export const formatPrice = (price: number, currency = ' Fr') => {
	return `${price.toLocaleString('fr-FR')}${currency}`
}