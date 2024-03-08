//импорт главной страницы из page
//в ней и реализовать проверку на авторизацию потом, когда будет кабинет



//импорт страницы с деталями программы
//импорт всего, что будет связано с роутдомом
//
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CatalogProgramsPage } from "./pages/catalogProgramsPage/CatalogProgramsPage"
import { DetailsProgramPage } from "./pages/detailsProgramPage/DetailsProgramPage"
import { MainPage } from "./pages/mainPage/MainPage";
import { Login } from "./pages/login/Login";
import { NewsPage } from "./pages/newsPage/NewsPage";
import { useDispatch, useSelector } from 'react-redux'; 
import { useEffect } from "react";
import { fetchLogin } from "./store/reducers/auth";
import { AddNewsPage } from "./pages/addNewsPage/AddNewsPage";
import { AddProgramPage } from "./pages/addProgramPage/AddProgramPage";

function App() {
	const dispatch = useDispatch();
	const isAuth = Boolean(useSelector(state => state.auth.userData)); //проверим, выполнена ли авторизация (если да, в стейте будут данные)
	console.log('Проверка авторизации при первом запуске приложения', isAuth);
	useEffect(() => {
		dispatch(fetchLogin()); 
	}, [])
	const router = createBrowserRouter([
		{
			path: "/",
			element: <MainPage />,
			// ДОБАВИТЬ ERROR
		},
		{
			path: "/learn",
			element: <CatalogProgramsPage />,
		},
		{
			path: "/learn/description_programm/:programm_id",
			element: <DetailsProgramPage />,
		},
		{
			path: "/login",
			element: <Login />,
		},
		{
			path: "/news",
			element: <NewsPage />,
		},
		{
			path: "/addnews",
			element: <AddNewsPage />,
		},
		{
			path: "/news/:id/edit",
			//при клике редактирования мы передадим id и перейдем на урл edit и откроется то же окно как при создании
			element: <AddNewsPage />, 
		},
		{
			path: "/addprogram",
			element: <AddProgramPage />,
		},
		{
			path: "/program/:id/edit",
			//при клике редактирования мы передадим id и перейдем на урл edit и откроется то же окно как при создании
			element: <AddProgramPage />,
		},
    // programm_id обычно получают из loader с помощью которого делают асинхронный запрос на сервер
	]);

	return (<RouterProvider router={router} />);
}

export default App;


