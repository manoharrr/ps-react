import React from "react";
import { render, screen } from "./components/test-utils/index";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("link", { name: "PS Bank" });
  expect(linkElement).toBeInTheDocument();
});
