import { act } from "react-dom/test-utils";
import { render, screen } from "../test-utils/index";
import AccountDetails from "./AccountDetails";
import user from "@testing-library/user-event";

const SBUser = {
  category: "Regular",
  accBalance: 0,
  minBalance: 0,
  loading: false,
  error: "",
  modal: false,
  success: "",
};

describe("Home Page", () => {
  test("component renders error modal when amount is greater than availabe balance", async () => {
    // await act(() => {
    render(<AccountDetails />, {
      preLoadedState: {
        savingAcc: { ...SBUser, error: "Error" },
      },
    });
    // });

    const text = await screen.findByText("Insufficient Balance");
    expect(text).toBeInTheDocument();
  });
  test("component renders loading spinner", async () => {
    await act(() => {
      render(<AccountDetails />, {
        preLoadedState: {
          savingAcc: { ...SBUser, loading: true },
        },
      });
    });
    const alert = await screen.findByRole("alert");
    expect(alert).toBeInTheDocument();
  });
  test("component renders Platinum user component", async () => {
    // act(() => {
    render(<AccountDetails />, {
      preLoadedState: {
        savingAcc: { ...SBUser, category: "Premium" },
      },
    });
    // });
    const heading = await screen.findByText("Premium");
    expect(heading).toBeInTheDocument();
  });
  test("able to add money by clicking Deposit funds", async () => {
    // act(() => {
    render(<AccountDetails />, {
      preLoadedState: {
        savingAcc: SBUser,
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Deposit Funds" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "1234");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });

  test("able to withdraw funds by clicking Withdraw Funds", async () => {
    // act(() => {
    render(<AccountDetails />, {
      preLoadedState: {
        savingAcc: { ...SBUser, accBalance: 1500 },
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Withdraw Funds" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "1500");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });
  test("not able to withdraw funds by clicking Withdraw Funds", async () => {
    // act(() => {
    render(<AccountDetails />, {
      preLoadedState: {
        savingAcc: { ...SBUser, accBalance: 1500 },
      },
    });
    // });
    const button = screen.getByRole("button", { name: "Withdraw Funds" });
    expect(button).toBeEnabled();
    await user.click(button);
    const label = await screen.findByText("Amount");
    expect(label).toBeInTheDocument();
    await user.type(label, "1600");
    const confirmButton = screen.getByRole("button", { name: "Confirm" });
    await user.click(confirmButton);
    expect(label).not.toBeInTheDocument();
  });
});
