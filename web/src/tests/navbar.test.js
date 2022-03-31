import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "../components/NavBar/NavBar";
import { ChakraProvider } from "@chakra-ui/react";

describe("Nav-bar testing", () => {
  beforeEach(() => {
    render(
      <ChakraProvider>
        <NavBar />
      </ChakraProvider>
    );
  });
  it("should render Login button correctly", () => {
    const button = screen.getByRole("button", { name: /login/i });
    expect(button).toBeInTheDocument();
  });
  it("should render Seach-bar correctly", () => {
    const searchbar = screen.getByRole("textbox");
    const placeholder = screen.getByPlaceholderText(/search/i);
    expect(searchbar).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();
  });
  it("should render help button with href attribute to /help", () => {
    const helpButton = screen.getByText(/help/i);
    expect(helpButton).toHaveAttribute("href", "/help");
  });
  it("should render about us button with href attribute to /about", () => {
    const helpButton = screen.getByText(/about us/i);
    expect(helpButton).toHaveAttribute("href", "/about");
  });
  it("should render purchase NFT ticket today", () => {
    const purchaseText = screen.getByText(
      /Purchase your NFT ticket today, hold it forever/i
    );
    expect(purchaseText).toBeInTheDocument();
  });
  it("should render More than just tickets", () => {
    const moreThanTickets = screen.getByText(/More than just tickets./i);
    expect(moreThanTickets).toBeInTheDocument();
  });
});
