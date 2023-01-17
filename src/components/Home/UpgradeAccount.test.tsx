import { render, screen } from "../test-utils/index";
import UpgradeAccount from "./UpgradeAccount";
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

describe("If the user has regular account then", () => {
  test("upgrade account button should not be enabled if available balanace is less than 10000", async () => {
    render(<UpgradeAccount />, {
      preLoadedState: { savingAcc: SBUser },
    });

    const button = screen.getByRole("button", { name: "Upgrade Account" });
    expect(button).toBeDisabled();
  });
  test("upgrade account button should be enabled if available balanace is greater tha 10000", async () => {
    render(<UpgradeAccount />, {
      preLoadedState: { savingAcc: { ...SBUser, accBalance: 15000 } },
    });

    const button = screen.getByRole("button", { name: "Upgrade Account" });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
  test("user should get downgraded on button click", async () => {
    render(<UpgradeAccount />, {
      preLoadedState: {
        savingAcc: {
          ...SBUser,
          accBalance: 15000,
          minBalance: 1000,
          category: "Premium",
          success: "Credit Card Downgraded",
        },
      },
    });
    const button = screen.getByRole("button", { name: "Downgrade Account" });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});
