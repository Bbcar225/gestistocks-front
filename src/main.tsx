import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {ReactQueryClientProvider} from "./providers/ReactQueryClientProvider.tsx";
import SuspensePage from "./components/templates/SuspensePage.tsx";
import {ConfigProvider} from "antd";
import frFR from "antd/locale/fr_FR";
import theme from "./theme.ts";
import 'antd/dist/reset.css';
import './index.css';
import router from "./providers/ReactRouterProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReactQueryClientProvider>
			<ConfigProvider locale={frFR} theme={theme}>
				<Suspense fallback={<SuspensePage/>}>
					<RouterProvider
						router={router}
						future={{
							v7_startTransition: true,
							v7_relativeSplatPath: true
						}}
					/>
				</Suspense>
			</ConfigProvider>
		</ReactQueryClientProvider>
	</React.StrictMode>
);
