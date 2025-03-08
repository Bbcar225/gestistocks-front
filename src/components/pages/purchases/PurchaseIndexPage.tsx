import {Link} from "react-router-dom";

export default function PurchaseIndexPage() {
	return <>
		<h1>Purchases List</h1>
		<p><Link to='/tenant_slug/purchases/create'>New</Link></p>
		<p><Link to='/tenant_slug/purchases/123'>A purchase</Link></p>
	</>
}