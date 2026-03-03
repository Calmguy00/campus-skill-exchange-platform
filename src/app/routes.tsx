import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AddSkillPage } from "./pages/AddSkillPage";
import { RequestsPage } from "./pages/RequestsPage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "add-skill", Component: AddSkillPage },
      { path: "requests", Component: RequestsPage },
    ],
  },
]);
