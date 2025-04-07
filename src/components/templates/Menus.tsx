import {Menu, MenuProps} from "antd";

const items: MenuProps['items'] = [
].map((icon, index) => ({
	key: String(index + 1),
	icon: icon,
	label: `nav ${index + 1}`,
}));

export function Menus() {
	return <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items}/>
}