import { render, screen } from "@testing-library/react";
import UpgradeOffer from "./UpgradeOffer";

test("renders component correctly", () => {
  render(<UpgradeOffer />);
  expect(screen.getByText(/Premium Account/)).toBeInTheDocument();
});
