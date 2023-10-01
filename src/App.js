import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { adminRoutes, userRoutes } from "./routes";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {adminRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout ? route.layout : React.Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page/>
                                </Layout>
                            }
                        />
                    );
                })}

                {userRoutes.map((route, index) => {
                    const Page = route.component;
                    const Layout = route.layout ? route.layout : React.Fragment;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    )
}
