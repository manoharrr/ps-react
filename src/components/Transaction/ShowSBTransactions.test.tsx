import { render, screen } from "../test-utils/index";
import ShowSBTransactions from "./ShowSBTransactions";
import user from "@testing-library/user-event";
import { InitialState } from "../../redux/features/transactionSlice";
import { act } from "react-dom/test-utils";

const transaction: InitialState = {
  loading: false,
  error: "",
  showTransactions: [],
};

describe("ShowTransaction", () => {
  test("component renders correctly with no data", async () => {
    await act(() =>
      render(<ShowSBTransactions type='savings_account' />, {
        preLoadedState: { transaction },
      })
    );
    expect(screen.getByText("No data found")).toBeInTheDocument();
  });
  test("component renders with SB data", async () => {
    let newTransaction = {
      ...transaction,
      showTransactions: [
        {
          transactionType: "credit",
          accountType: "savings_account",
          amount: 3200,
          createdAt: "1673720635262",
          updatedAt: "1673720635262",
          _id: "63c2f33b181b22e09f047dc2",
        },
      ],
    };
    await act(() =>
      render(<ShowSBTransactions type='savings_account' />, {
        preLoadedState: { transaction: newTransaction },
      })
    );
    expect(screen.getByText("credit")).toBeInTheDocument();
    expect(screen.getByText("Savings Account")).toBeInTheDocument();
    expect(screen.getByText("Sat Jan 14 2023")).toBeInTheDocument();
  });
  test("component renders with credit data", async () => {
    let newTransaction = {
      ...transaction,
      showTransactions: [
        {
          transactionType: "debit",
          accountType: "credit_card",
          amount: 2000,
          createdAt: "1673873498070",
          updatedAt: "1673873498070",
          _id: "63c5485a181b22e09f047e91",
        },
      ],
    };
    await act(() =>
      render(<ShowSBTransactions type='credit_card' />, {
        preLoadedState: { transaction: newTransaction },
      })
    );
    expect(screen.getByText("debit")).toBeInTheDocument();
    expect(screen.getByText("Credit Card")).toBeInTheDocument();
    expect(screen.getByText("Mon Jan 16 2023")).toBeInTheDocument();
  });
});
