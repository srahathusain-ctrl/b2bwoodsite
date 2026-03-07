import { render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies primary variant classes", () => {
    render(<Button variant="primary">Primary</Button>);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-gold");
  });

  it("is disabled when disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText("Disabled")).toBeDisabled();
  });
});
