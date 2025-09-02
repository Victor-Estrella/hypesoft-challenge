import HomePage from "../app/page";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";

describe("HomePage", () => {
  it("renderiza título e descrição", () => {
    render(<HomePage />);
    expect(screen.getByText(/Bem-vindo ao HypeSoft Challenge/i)).toBeInTheDocument();
    expect(screen.getByText(/Sistema de gestão de produtos, categorias e estoque/i)).toBeInTheDocument();
  });
});
