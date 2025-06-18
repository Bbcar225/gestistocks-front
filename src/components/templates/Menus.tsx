import {Menu, Spin} from "antd";
import {AiFillDashboard} from "react-icons/ai";
import {GrCatalog, GrGallery} from "react-icons/gr";
import {MdAccountCircle, MdAcUnit, MdCalculate} from "react-icons/md";
import {isMobile} from 'react-device-detect';
import {BiSolidCategory, BiSolidPurchaseTag} from "react-icons/bi";
import {ReactNode, useMemo} from "react";
import {useLocation} from "react-router-dom";
import {RiLogoutBoxFill, RiProductHuntLine} from "react-icons/ri";
import {FaWarehouse} from "react-icons/fa";
import {TbUserDollar} from "react-icons/tb";
import {FaComputer, FaUsersViewfinder} from "react-icons/fa6";
import {TiShoppingCart} from "react-icons/ti";
import useRoutesUnit from "../../hooks/routes/UnitRoutesHook.ts";
import useRoutesIndex from "../../hooks/routes/IndexRoutesHook.ts";
import useRoutesCategory from "../../hooks/routes/CategoryRoutesHook.ts";
import useRoutesGallery from "../../hooks/routes/GalleryRoutesHook.ts";
import useRoutesProduct from "../../hooks/routes/ProductRoutesHook.ts";
import useRoutesWarehouse from "../../hooks/routes/WarehouseRoutesHook.ts";
import useRoutesSupplier from "../../hooks/routes/SupplierRoutesHook.ts";
import useRoutesPurchase from "../../hooks/routes/PurchaseRoutesHook.ts";
import useRoutesCustomer from "../../hooks/routes/CustomerRoutesHook.ts";
import useRoutesSale from "../../hooks/routes/SaleRoutesHook.ts";
import {IoMdSettings} from "react-icons/io";
import {ImProfile} from "react-icons/im";
import {useAuthLogout} from "../../hooks/Api/tenant/AuthHookAPI.ts";
import {useTokenStore, useUserStore} from "../../store/useUserStore.ts";
import useRoutesAccount from "../../hooks/routes/AccountRoutesHook.ts";

type MenuItem = {
	key: string;
	label: ReactNode;
	icon?: ReactNode;
	pathmatch?: string;
	onClick?: () => void;
	children?: MenuItem[];
	disabled?: boolean;
};

export function Menus({collapsed, setCollapsed}: {
	collapsed: boolean,
	setCollapsed: (collapsed: boolean) => void
}) {
	const {goToUnitIndex} = useRoutesUnit()
	const {goToDashboard, goToPos} = useRoutesIndex()
	const {goToCategoryIndex} = useRoutesCategory()
	const {goToGalleryIndex} = useRoutesGallery()
	const {goToProductIndex} = useRoutesProduct()
	const routesWarehouse = useRoutesWarehouse()
	const routesSupplier = useRoutesSupplier()
	const routesPurchase = useRoutesPurchase()
	const routesCustomer = useRoutesCustomer()
	const routesSale = useRoutesSale()
	const location = useLocation();
	const currentPath = location.pathname;
	const reqAuthLogout = useAuthLogout()
	const {setUser} = useUserStore()
	const {setToken} = useTokenStore()
	const routesAccount = useRoutesAccount()
	
	const items: MenuItem[] = [
		{
			key: "Tableau de bord",
			icon: <AiFillDashboard/>,
			label: "Tableau de bord",
			pathmatch: "/dashboard",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				goToDashboard();
			},
		},
		{
			key: "POS",
			icon: <FaComputer/>,
			label: "POS",
			pathmatch: "/pos",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				goToPos()
			},
		},
		{
			key: "Ventes",
			icon: <TiShoppingCart/>,
			label: "Ventes",
			pathmatch: "/sales",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				routesSale.goToIndex()
			},
		},
		{
			key: "Client",
			icon: <FaUsersViewfinder/>,
			label: "Client",
			pathmatch: "/customers",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				routesCustomer.goToIndex();
			},
		},
		{
			key: "Fournisseurs",
			icon: <TbUserDollar/>,
			label: "Fournisseurs",
			pathmatch: "/suppliers",
			onClick: () => {
				if (isMobile) setCollapsed(!collapsed);
				routesSupplier.goToIndex();
			},
		},
		{
			key: "Catalogue",
			label: "Catalogue",
			icon: <GrCatalog/>,
			children: [
				{
					key: "Unités",
					label: "Unités",
					icon: <MdAcUnit/>,
					pathmatch: "/units",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToUnitIndex();
					},
				},
				{
					key: "Catégories",
					label: "Catégories",
					icon: <BiSolidCategory/>,
					pathmatch: "/categories",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToCategoryIndex();
					},
				},
				{
					key: "Galeries",
					label: "Galeries",
					icon: <GrGallery/>,
					pathmatch: "/galleries",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						goToGalleryIndex();
					},
				},
				{
					key: "Produits",
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
			key: "Stocks",
			label: "Stocks",
			icon: <MdCalculate/>,
			children: [
				{
					key: "Dépôts",
					label: "Dépôts",
					icon: <FaWarehouse/>,
					pathmatch: "/warehouses",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						routesWarehouse.goToIndex()
					},
				},
				{
					key: "Achats",
					label: "Achats",
					icon: <BiSolidPurchaseTag/>,
					pathmatch: "/purchases",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						routesPurchase.goToIndex();
					},
				},
			],
		},
		{
			key: "Réglages",
			label: "Réglages",
			icon: <IoMdSettings/>,
			children: [
				{
					key: "Mon compte",
					label: "Mon compte",
					icon: <MdAccountCircle/>,
					pathmatch: "/account",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						routesAccount.goToAccount()
					},
				},
				{
					key: "Mon profil",
					label: "Mon profil",
					icon: <ImProfile/>,
					pathmatch: "/profil",
					onClick: () => {
						if (isMobile) setCollapsed(!collapsed);
						routesWarehouse.goToIndex()
					},
				},
				{
					key: "Déconnexion",
					label: reqAuthLogout.isLoading ? <Spin size='small'/> : "Déconnexion",
					icon: <RiLogoutBoxFill/>,
					disabled: reqAuthLogout.isLoading,
					onClick: () => {
						reqAuthLogout.mutate(undefined, {
							onSuccess: () => {
								setUser(undefined)
								setToken(undefined)
							}
						})
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
			selectedKey: selected ?? "Tableau de bord",
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
