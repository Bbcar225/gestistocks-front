import {Link} from "react-router-dom";

export default function PurchaseCreatePage() {
	return <>
		<h1>New purchase</h1>
		<Link to='/tenant_slug/purchases'>List</Link>
	</>
}