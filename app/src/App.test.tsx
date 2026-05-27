import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("shows the social security management heading and key modules", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Gestion de seguridad social para empleo domestico"
    );
    expect(screen.getByText("Empleadas")).toBeInTheDocument();
    expect(screen.getByText("Seguridad social")).toBeInTheDocument();
    expect(screen.getByText("Pagos")).toBeInTheDocument();
  });
});
