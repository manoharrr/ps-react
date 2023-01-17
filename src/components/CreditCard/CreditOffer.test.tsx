import { render, screen } from "@testing-library/react";
import CreditOffer from "./CreditOffer";

test("renders the component with correct date", () => {
  render(<CreditOffer />);
  let date = new Date();
  date.setDate(date.getDate() + 45);
  const text = screen.getByText(date.toDateString());
  expect(text).toBeInTheDocument();
});
