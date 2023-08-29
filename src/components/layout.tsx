import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-2">
            MENU
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/sets">Lego Sets</a>
              </li>
              <li>
                <a href="/test">Test</a>
              </li>
            </ul>
          </div>
          <div className="col-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
