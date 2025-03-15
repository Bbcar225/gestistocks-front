import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "antd/dist/reset.css";
import {ReactQueryClientProvider} from "./providers/ReactQueryClientProvider.tsx";
import {router} from "./providers/ReactRouterProvider.tsx";
import SuspensePage from "./components/templates/SuspensePage.tsx";
import {ConfigProvider} from "antd";
import frFR from "antd/locale/fr_FR";
import theme from "./theme.ts";

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
