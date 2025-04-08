import {Menu, MenuProps} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog} from "react-icons/gr";
import {MdAcUnit} from "react-icons/md";
import {useUnitRoutes} from "../../routes/unitRoutes.ts";
import {useIndexRoutes} from "../../routes";

type MenuItem = Required<MenuProps>['items'][number];

export function Menus() {
	const {goToUnitIndex} = useUnitRoutes()
	const {goToDashboard} = useIndexRoutes()
	
	const items: MenuItem[] = [
		{
			key: '1',
			icon: <AiFillDashboard/>,
			label: 'Tableau de bord',
			onClick: goToDashboard
		},
		{
			key: '2',
			label: 'Catalogue',
			icon: <GrCatalog/>,
			children: [
				{
					key: '21',
					label: 'Unités',
					icon: <MdAcUnit/>,
					onClick: goToUnitIndex
				},
			],
		},
	];
	
	return <Menu
		theme="dark"
		mode="inline"
		defaultSelectedKeys={['2']}
		items={items}
	/>
}