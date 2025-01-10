/* @refresh reload */
import "./tailwind.css";

import { render } from "solid-js/web";
import { Router, Route, Navigate } from "@solidjs/router";

import { AddPage } from "./pages/AddPage";
import { HistoryPage } from "./pages/HistoryPage";
import PageWrapper from "./components/PageWrapper";

const root = document.getElementById("root");

render(
  () => (
    <Router root={PageWrapper}>
      <Route path="/add" component={AddPage} />
      <Route path="/history/:ISO_DATE" component={HistoryPage} />
      <Route path="*" component={() => <Navigate href={"/add"} />} />
    </Router>
  ),
  root!,
);
