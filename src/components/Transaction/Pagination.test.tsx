import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";
import user from "@testing-library/user-event";

interface Props {
  transactionPerPage: number;
  totalPosts: number;
  currentPage: number;
  indexOfLastTransaction: number;
  indexOfFirstPost: number;
  paginate: (val: number) => void;
}

describe("Pagination", () => {
  const paginateMock = jest.fn((x) => {});
  const paginationProps: Props = {
    transactionPerPage: 5,
    totalPosts: 12,
    currentPage: 1,
    indexOfLastTransaction: 0,
    indexOfFirstPost: 5,
    paginate: paginateMock,
  };
  test("component renders correctly and able to click next button", async () => {
    render(<Pagination {...paginationProps} />);
    const prev = screen.getByRole("button", { name: "Prev" });
    expect(prev).toBeDisabled();
    const next = screen.getByRole("button", { name: "Next" });
    expect(next).toBeEnabled();
    await user.click(next);
    expect(paginateMock).toBeCalled();
    expect(paginateMock).toHaveBeenCalledWith(2);
  });
  test("component renders correctly and able to click prev button", async () => {
    let prevPaginationProps = { ...paginationProps, currentPage: 2 };
    render(<Pagination {...prevPaginationProps} />);
    const prev = screen.getByRole("button", { name: "Prev" });
    expect(prev).toBeEnabled();
    await user.click(prev);
    expect(paginateMock).toBeCalled();
    expect(paginateMock).toHaveBeenCalledWith(1);
  });
  test("component renders correctly with posts less than 8", () => {
    let prevPaginationProps = { ...paginationProps, totalPosts: 5 };
    render(<Pagination {...prevPaginationProps} />);
    const prev = screen.getByRole("button", { name: "Prev" });
    expect(prev).toBeDisabled();
  });
  test("component renders correctly when in last page", () => {
    let prevPaginationProps = {
      ...paginationProps,
      indexOfLastTransaction: 15,
    };
    render(<Pagination {...prevPaginationProps} />);
    const prev = screen.getByRole("button", { name: "Prev" });
    expect(prev).toBeDisabled();
  });
});
