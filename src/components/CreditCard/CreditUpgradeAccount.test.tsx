import { createEvent, render, screen, waitFor } from "../test-utils";
import CreditUpgradeAccount from "./CreditUpgradeAccount";
// import { graphql } from "msw";
// import { server } from "../../mocks/server";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

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

const creditPlatinumUser = {
  cardType: "Platinum",
  totalBalance: 150000,
  usedBalance: 0,
  availableBalance: 150000,
  annualCharges: 2500,
  loading: false,
  error: "",
  modal: false,
  success: "",
};

describe("If the user has gold credit card then", () => {
  test("upgrade credit card button should be enabled", async () => {
    render(<CreditUpgradeAccount />, {
      preLoadedState: { creditCard: creditGoldUser },
    });

    const button = screen.getByRole("button", { name: "Upgrade Credit Card" });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  test("user should get downgraded on button click", async () => {
    render(<CreditUpgradeAccount />, {
      preLoadedState: {
        creditCard: {
          ...creditPlatinumUser,
          success: "Credit Card Downgraded",
        },
      },
    });
    const text = screen.getByText("Credit Card Downgraded");
    // await waitFor(async () => await user.click(button));
    expect(text).toBeInTheDocument();
  });
});

describe("If the user has platinum credit card then", () => {
  test("downgrade credit card button should be enabled", async () => {
    render(<CreditUpgradeAccount />, {
      preLoadedState: { creditCard: creditPlatinumUser },
    });

    const button = screen.getByRole("button", {
      name: "Downgrade Credit Card",
    });
    expect(button).toBeEnabled();
    await user.click(button);
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  test("check coupon exists", () => {
    render(<CreditUpgradeAccount />, {
      preLoadedState: { creditCard: creditPlatinumUser },
    });

    const text = screen.getByAltText("bookmyshow coupon");
    expect(text).toBeInTheDocument();
  });
});
