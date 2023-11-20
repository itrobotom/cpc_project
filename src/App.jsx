//импорт главной страницы из page
//в ней и реализовать проверку на авторизацию потом, когда будет кабинет



//импорт страницы с деталями программы
//импорт всего, что будет связано с роутдомом
//
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CatalogProgramsPage } from "./pages/catalogProgramsPage/CatalogProgramsPage"
import { DetailsProgramPage } from "./pages/detailsProgramPage/DetailsProgramPage"

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <CatalogProgramsPage />,
			// ДОБАВИТЬ ERROR
		},
		{
			path: "description_programm/:programm_id",
			element: <DetailsProgramPage />,
		},
    // programm_id обычно получают из loader с помощью которого делают асинхронный запрос на сервер
	]);

	return (<RouterProvider router={router} />);
}

export default App;


