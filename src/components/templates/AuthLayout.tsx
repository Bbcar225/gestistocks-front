import {Link, Outlet} from "react-router-dom";

export function AuthLayout() {
	return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <Link to="/tenant_slug/dashboard">Dashboard</Link>
        <li>
          <Link to="/tenant_slug/purchases">Purchases</Link>
        </li>
      </ul>
      <Outlet/>
      <footer>© 2025 Mon App</footer>
    </div>
  );
}