import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import "antd/dist/reset.css";
import {ReactQueryClientProvider} from "./providers/ReactQueryClientProvider.tsx";
import {router} from "./providers/ReactRouterProvider.tsx";
import SuspensePage from "./components/templates/SuspensePage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ReactQueryClientProvider>
			<Suspense fallback={<SuspensePage />}>
				<RouterProvider router={router}/>
			</Suspense>
		</ReactQueryClientProvider>
	</React.StrictMode>
);
