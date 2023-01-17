import { render, screen } from "../test-utils/index";
import CreditCard from "./CreditCard";
import user from "@testing-library/user-event";

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
  test("component renders error modal when amount is greater than availabe balance", async () => {
    // await act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: { ...creditUser, error: "Error" },
      },
    });
    // });

    const text = await screen.findByText("Insufficient Balance");
    expect(text).toBeInTheDocument();
  });

  test("component renders loading spinner", async () => {
    // await act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: { ...creditUser, loading: true },
      },
    });
    // });
    const alert = await screen.findAllByRole("alert");
    expect(alert[1]).toBeInTheDocument();
  });
  test("component renders Platinum user component", async () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: { ...creditUser, cardType: "Platinum" },
      },
    });
    // });
    const heading = await screen.findByText("Platinum");
    expect(heading).toBeInTheDocument();
  });
  test("the button pay bill has to be disabled when used balance is zero", () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: creditUser,
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Pay Bill" });
    expect(button).toBeDisabled();
  });
  test("able to spend amount by clicking spend funds", async () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: creditUser,
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Spend Funds" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "1234");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });
  test("not able to spend amount by clicking spend funds", async () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: creditUser,
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Spend Funds" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "60000");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });
  test("able to pay bill by clicking pay bill", async () => {
    // act(() => {
    render(<CreditCard />, {
      preLoadedState: {
        creditCard: { ...creditUser, usedBalance: 1500 },
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Pay Bill" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "1500");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });
});
