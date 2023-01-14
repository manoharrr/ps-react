import { render, screen } from "../test-utils";
import CreditUpgradeAccount from "./CreditUpgradeAccount";

const creditGoldUser = {
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

test("If the user has gold card then upgrade credit card button should be enabled", () => {
  render(<CreditUpgradeAccount />, {
    preLoadedState: { creditCard: creditGoldUser },
  });
  const text = screen.getByRole("button", { name: "Upgrade Credit Card" });
  expect(text).toBeInTheDocument();
});
