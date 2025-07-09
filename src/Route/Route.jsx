import { createBrowserRouter, RouterProvider } from "react-router";

import Root from "../Pages/Front/Root";
import Home from "../Pages/Front/Home";
import ProtfolioDetails from "../Pages/Front/ProtfolioDetails";
import Projects from "../Pages/Front/Projects";
import Frontend from "../Pages/Front/Frontend";
import Server from "../Pages/Front/Server";
import Contract from "../Pages/Front/Contract";
import Login from "../Pages/Backend/Login";
import Register from "../Pages/Backend/Register";
import Dashboard from "../Pages/Backend/Dashboard";
import PrivateRoute from "./PrivateRoute";
import BackRoot from "../Pages/Backend/BackRoot";
import AddSkill from "../Pages/Backend/Skill/AddSkill";
import AllSkill from "../Pages/Backend/Skill/AllSkill";
import AddFeather from "../Pages/Backend/Feather/AddFeather";
import AllFeather from "../Pages/Backend/Feather/AllFeather";
import EditSkill from "../Pages/Backend/Skill/EditSkill";
import EditFeather from "../Pages/Backend/Feather/EditFeather";
import AddEducation from "../Pages/Backend/Education/AddEducation";
import AllEducation from "../Pages/Backend/Education/AllEducation";
import EditEducation from "../Pages/Backend/Education/EditEducation";
import AddExperience from "../Pages/Backend/Experience/AddExperience";
import AllExperience from "../Pages/Backend/Experience/AllExperience";
import EditExperience from "../Pages/Backend/Experience/EditExperience";
import AddProtfolio from "../Pages/Backend/Protfolio/AddProtfolio";
import AllProtfolio from "../Pages/Backend/Protfolio/AllProtfolio";
import ViewPortfolio from "../Pages/Backend/Protfolio/ViewPortfolio";
import EditProtfolio from "../Pages/Backend/Protfolio/EditProtfolio";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      {
        path: "/details/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addprotfolio/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        Component: ProtfolioDetails,
      },
      {
        path: "/projects",
        loader: () => fetch("https://server-site-azure.vercel.app/addprotfolio"),
        Component: Projects,
      },
      {
        path: "/frontend",
        loader: () => fetch("https://server-site-azure.vercel.app/addprotfolio"),
        Component: Frontend,
      },
      {
        path: "/server",
        loader: () => fetch("https://server-site-azure.vercel.app/addprotfolio"),
        Component: Server,
      },
      {
        path: "/contact",
        Component: Contract,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Login,
  },
  {
    path: "/dashboard",
    loader: async () => {
      const response = await fetch(
        "https://server-site-azure.vercel.app/adduser"
      );
      if (!response.ok) {
        throw new Error("Failed to load user data");
      }
      return response.json(); // This will be accessible via useLoaderData in Root component
    },
    element: (
      <PrivateRoute>
        <BackRoot />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/adduser"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        Component: Dashboard,
      },
      // Skill Section
      {
        path: "addskill",
        element: (
          <PrivateRoute>
            <AddSkill />
          </PrivateRoute>
        ),
      },
      {
        path: "allskill",
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/addskill"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <AllSkill />
          </PrivateRoute>
        ),
      },
      // Feather Section
      {
        path: "addfeather",
        element: (
          <PrivateRoute>
            <AddFeather />
          </PrivateRoute>
        ),
      },
      {
        path: "allfeather",
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/addfeather"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <AllFeather />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allskill/skill-edit/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addskill/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EditSkill />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allfeather/feather-edit/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addfeather/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EditFeather />
          </PrivateRoute>
        ),
      },
      // Add Education
      {
        path:"addeducation",
        element: (
          <PrivateRoute>
            <AddEducation />
          </PrivateRoute>
        ),
      },
      {
        path:"alleducation",
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/addeducation"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <AllEducation />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/alleducation/education-edit/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addeducation/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EditEducation />
          </PrivateRoute>
        ),
      },
      {
        path:"addexperience",
        element: (
          <PrivateRoute>
            <AddExperience />
          </PrivateRoute>
        ),
      },
      {
        path:"allexperience",
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/addexperience"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <AllExperience />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allexperience/experience-edit/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addexperience/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EditExperience />
          </PrivateRoute>
        ),
      },
      // addportfolio
      {
        path:"addportfolio",
        element: (
          <PrivateRoute>
            <AddProtfolio />
          </PrivateRoute>
        ),
      },
      {
        path: "allportfolio",
        loader: async () => {
          const response = await fetch(
            "https://server-site-azure.vercel.app/addprotfolio"
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <AllProtfolio />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allportfolio/portfolio-view/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addprotfolio/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <ViewPortfolio />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allportfolio/portfolio-edit/:id",
        loader: async ({params}) => {
          const response = await fetch(
            `https://server-site-azure.vercel.app/addprotfolio/${params.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to load user data");
          }
          return response.json();
        },
        element: (
          <PrivateRoute>
            <EditProtfolio />
          </PrivateRoute>
        ),
      },
      
    ],
  },
]);
