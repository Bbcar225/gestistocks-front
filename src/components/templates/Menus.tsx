import {Menu} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog, GrGallery} from "react-icons/gr";
import {MdAcUnit} from "react-icons/md";
import {useRoutesUnit} from "../../routes/unitRoutes.ts";
import {useRoutesIndex} from "../../routes";
import {isMobile} from 'react-device-detect';
import {BiSolidCategory} from "react-icons/bi";
import {useRoutesCategory} from "../../routes/categoryRoutes.ts";
import {ReactNode, useMemo} from "react";
import {useLocation} from "react-router-dom";
import {useRoutesGallery} from "../../routes/galleryRoutes.ts";
import {RiProductHuntLine} from "react-icons/ri";
import {useRoutesProduct} from "../../routes/productRoutes.ts";
import {FaWarehouse} from "react-icons/fa";
import {useRoutesWarehouse} from "../../routes/warehouseRoutes.ts";
import {TbUserDollar} from "react-icons/tb";
import {useRoutesSupplier} from "../../routes/supplierRoutes.ts";

type MenuItem = {
	key: string;
	label: string;
	icon?: ReactNode;
	pathmatch?: string;
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
	const {goToGalleryIndex} = useRoutesGallery()
	const {goToProductIndex} = useRoutesProduct()
	const routesWarehouse = useRoutesWarehouse()
	const routesSupplier = useRoutesSupplier()
	
	const location = useLocation();
	const currentPath = location.pathname;
	
	const items: MenuItem[] = [
		{
			key: "1",
			icon: <AiFillDashboard/>,
			label: "Tableau de bord",
			pathmatch: "/dashboard",
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
					pathmatch: "/units",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToUnitIndex();
					},
				},
				{
					key: "22",
					label: "Catégories",
					icon: <BiSolidCategory/>,
					pathmatch: "/categories",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToCategoryIndex();
					},
				},
				{
					key: "23",
					label: "Galeries",
					icon: <GrGallery/>,
					pathmatch: "/galleries",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToGalleryIndex();
					},
				},
				{
					key: "24",
					label: "Produits",
					icon: <RiProductHuntLine/>,
					pathmatch: "/products",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToProductIndex();
					},
				},
			],
		},
		{
			key: "3",
			label: "Dépôts",
			icon: <FaWarehouse/>,
			pathmatch: "/warehouses",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				routesWarehouse.goToIndex()
			},
		},
		{
			key: "4",
			icon: <TbUserDollar/>,
			label: "Fournisseurs",
			pathmatch: "/supplies",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				routesSupplier.goToIndex();
			},
		},
	];
	
	const {selectedKey, openKey} = useMemo(() => {
		let selected: string | undefined = undefined;
		let open: string | undefined = undefined;
		
		for (const item of items) {
			if (item.children) {
				for (const child of item.children) {
					if (child.pathmatch && currentPath.includes(child.pathmatch)) {
						selected = child.key;
						open = item.key;
					}
				}
			} else if (item.pathmatch && currentPath.includes(item.pathmatch)) {
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
