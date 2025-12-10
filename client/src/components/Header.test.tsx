import { describe, it, beforeAll, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "wouter";
import { Header } from "./Header";
import { LanguageProvider } from "@/lib/language-context";

// avoid errors when code calls scrollIntoView
beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = () => {};
});

// helper to render Header with router + language context
function renderHeader(initialPath = "/") {
  window.history.pushState({}, "", initialPath);

  return render(
    <Router>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </Router>
  );
}

describe("Header", () => {
  it("renders the header, logo and desktop nav", () => {
    renderHeader("/");

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("link-logo")).toBeInTheDocument();
    expect(screen.getByTestId("nav-desktop")).toBeInTheDocument();
  });

  it("toggles language when EN/FR buttons are clicked", async () => {
    const user = userEvent.setup();
    renderHeader("/");

    const enButton = screen.getByTestId("button-lang-en");
    const frButton = screen.getByTestId("button-lang-fr");

    // default language is probably "en" so EN should be highlighted
    expect(enButton).toHaveClass("text-gold");

    // switch to FR
    await user.click(frButton);
    expect(frButton).toHaveClass("text-gold");
  });

  it("opens the mobile menu when the mobile button is clicked", async () => {
    const user = userEvent.setup();
    renderHeader("/");

    const mobileButton = screen.getByTestId("button-mobile-menu");
    expect(screen.queryByTestId("nav-mobile")).not.toBeInTheDocument();

    await user.click(mobileButton);

    expect(screen.getByTestId("nav-mobile")).toBeInTheDocument();
  });

  it("navigates to /policy when clicking Policy in More menu", async () => {
    const user = userEvent.setup();
    renderHeader("/");

    // open the dropdown
    const moreButton = screen.getByRole("button", { name: /more/i });
    await user.click(moreButton);

    // Radix renders the items in a portal; wait for the Policy item
    const policyItem = await screen.findByTestId("nav-policy");
    await user.click(policyItem);

    expect(window.location.pathname).toBe("/policy");
  });
});
