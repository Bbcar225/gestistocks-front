import {Menu} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog} from "react-icons/gr";
import {MdAcUnit} from "react-icons/md";
import {useRoutesUnit} from "../../routes/unitRoutes.ts";
import {useRoutesIndex} from "../../routes";
import {isMobile} from 'react-device-detect';
import {BiSolidCategory} from "react-icons/bi";
import {useRoutesCategory} from "../../routes/categoryRoutes.ts";
import {ReactNode, useMemo} from "react";
import {useLocation} from "react-router-dom";

type MenuItem = {
	key: string;
	label: string;
	icon?: ReactNode;
	pathMatch?: string;
	onClick?: () => void;
	children?: MenuItem[];
};

export function Menus({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {goToUnitIndex} = useRoutesUnit()
	const {goToDashboard} = useRoutesIndex()
	const {goToCategoryIndex} = useRoutesCategory()
	
	const location = useLocation();
	const currentPath = location.pathname;
	
	const items: MenuItem[] = [
		{
			key: "1",
			icon: <AiFillDashboard/>,
			label: "Tableau de bord",
			pathMatch: "/dashboard",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				goToDashboard();
			},
		},
		{
			key: "2",
			label: "Catalogue",
			icon: <GrCatalog/>,
			children: [
				{
					key: "21",
					label: "Unités",
					icon: <MdAcUnit/>,
					pathMatch: "/units",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToUnitIndex();
					},
				},
				{
					key: "22",
					label: "Catégories",
					icon: <BiSolidCategory/>,
					pathMatch: "/categories",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToCategoryIndex();
					},
				},
			],
		},
	];
	
	const {selectedKey, openKey} = useMemo(() => {
		let selected: string | undefined = undefined;
		let open: string | undefined = undefined;
		
		for (const item of items) {
			if (item.children) {
				for (const child of item.children) {
					if (child.pathMatch && currentPath.includes(child.pathMatch)) {
						selected = child.key;
						open = item.key;
					}
				}
			} else if (item.pathMatch && currentPath.includes(item.pathMatch)) {
				selected = item.key;
			}
		}
		
		return {
			selectedKey: selected ?? "1",
			openKey: open,
		}
	}, [currentPath]);
	
	return (
		<Menu
			theme="dark"
			mode="inline"
			selectedKeys={[selectedKey]}
			defaultOpenKeys={openKey ? [openKey] : []}
			items={items}
		/>
	);
}
