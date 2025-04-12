import {Menu, MenuProps} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog} from "react-icons/gr";
import {MdAcUnit} from "react-icons/md";
import {useRoutesUnit} from "../../routes/unitRoutes.ts";
import {useRoutesIndex} from "../../routes";
import {isMobile} from 'react-device-detect';

type MenuItem = Required<MenuProps>['items'][number];

export function Menus({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {goToUnitIndex} = useRoutesUnit()
	const {goToDashboard} = useRoutesIndex()
	
	const items: MenuItem[] = [
		{
			key: '1',
			icon: <AiFillDashboard/>,
			label: 'Tableau de bord',
			onClick: () => {
				if (isMobile) {
					setCollapsed(!collapsed)
				}
				goToDashboard()
			}
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
					onClick: () => {
						if (isMobile) {
							setCollapsed(!collapsed)
						}
						goToUnitIndex()
					}
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