import {Outlet} from "react-router-dom";
import {Layout} from "antd";
import {Content} from "antd/es/layout/layout";

export function GuestLayout() {
	return <Layout>
		<Content>
			<Outlet/>
		</Content>
	</Layout>
}