import React from "react";
import { render, screen } from "@testing-library/react";
import PlaceholderTitle from ".";

test("renders learn react link", () => {
  render(<PlaceholderTitle />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
