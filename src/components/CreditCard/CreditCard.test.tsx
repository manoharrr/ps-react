// import { act } from "react-dom/test-utils";
import { render, screen } from "../test-utils/index";
import CreditCard from "./CreditCard";

const creditUser = {
  cardType: "Gold",
  totalBalance: 50000,
  usedBalance: 0,
  availableBalance: 50000,
  annualCharges: 1000,
  loading: false,
  error: "",
  modal: false,
  success: "",
};

describe("Credit Card Page", () => {
  test("component renders error page with no props", async () => {
    // await act(() => {
    render(<CreditCard />);
    // });
    const heading = await screen.findByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test("component renders correctly", async () => {
    // await act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: creditUser,
      },
    });
    // });
    const heading = await screen.findByRole("heading", {
      name: "Credit Account Details",
    });
    expect(heading).toBeInTheDocument();
  });
  test("component renders new user component", async () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: { ...creditUser, error: "No Credit" },
      },
    });
    // });
    const heading = await screen.findByRole("heading", {
      name: "No Credit Card account found. Click below to create one.",
    });
    expect(heading).toBeInTheDocument();
  });
});
