import { render, screen } from "@testing-library/react";
import CreditUpgradeOffer from "./CreditUpgradeOffer";

test("Component Renders correctly", () => {
  render(<CreditUpgradeOffer />);
  const text = screen.getByText(/bookmyshow/i);
  expect(text).toBeInTheDocument();
});
