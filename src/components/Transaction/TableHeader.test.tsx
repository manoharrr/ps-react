import { render, screen } from "@testing-library/react";
import { ReactElement } from "react";
import TableHeader from "./TableHeader";

test("component renders correctly with default props", () => {
  render(<TableHeader />);
  expect(screen.getByText("No data found")).toBeInTheDocument();
});

test("component renders correctly with given props", () => {
  const data: ReactElement = (
    <>
      <tr>
        <td>credit</td>
        <td>Savings Account</td>
        <td>Rs.3200</td>
        <td>Sat Jan 14 2023</td>
      </tr>
    </>
  );
  render(<TableHeader data={data} />);
  expect(screen.getByText("credit")).toBeInTheDocument();
  expect(screen.getByText("Savings Account")).toBeInTheDocument();
  expect(screen.getByText(/3200/i)).toBeInTheDocument();
  expect(screen.getByText(/Jan 14/i)).toBeInTheDocument();
});
