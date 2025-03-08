import {Link} from "react-router-dom";

export default function PurchaseCreatePage() {
	return <>
		<h1>A purchases</h1>
		<p><Link to='/tenant_slug/purchases'>List</Link></p>
		<p><Link to='/tenant_slug/purchases/123/edit'>Edit</Link></p>
	</>
}