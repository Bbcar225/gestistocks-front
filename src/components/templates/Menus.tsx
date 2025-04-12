import {Menu, MenuProps} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog} from "react-icons/gr";
import {MdAcUnit} from "react-icons/md";
import {useUnitRoutes} from "../../routes/unitRoutes.ts";
import {useRoutesIndex} from "../../routes";

type MenuItem = Required<MenuProps>['items'][number];

export function Menus() {
	const {goToUnitIndex} = useUnitRoutes()
	const {goToDashboard} = useRoutesIndex()
	
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
		defaultSelectedKeys={['1']}
		items={items}
	/>
}