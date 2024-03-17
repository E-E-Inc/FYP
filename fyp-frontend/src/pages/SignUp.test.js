import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("SignUp", () => {
  it("displays validation error when form is submitted with empty fields", async () => {
    const { getByTestId, getByText } = render(<SignUp />);

    fireEvent.click(getByTestId("register-button"));

    await waitFor(() => {
      expect(
        getByText("Please enter both an email address and password")
      ).toBeInTheDocument();
    });
  });

  it("displays validation error when password has less than 6 chars", async () => {
    const { getByTestId, getByText, getByLabelText } = render(<SignUp />);

    fireEvent.input(getByLabelText("Email"), {
      target: { value: "email@example.com" },
    });
    fireEvent.input(getByLabelText("Password"), {
      target: { value: "pass" }, // password less than 6 chars
    });

    fireEvent.click(getByTestId("register-button"));

    await waitFor(() => {
      expect(
        getByText("Password must be 6 charachters long")
      ).toBeInTheDocument();
    });
  });

  it("displays validation error when the email entered is invalid", async () => {
    const { getByTestId, getByText, getByLabelText } = render(<SignUp />);

    fireEvent.input(getByLabelText("Email"), {
      target: { value: "email" },
    });
    fireEvent.input(getByLabelText("Password"), {
      target: { value: "password" }, // password less than 6 chars
    });

    fireEvent.click(getByTestId("register-button"));

    await waitFor(() => {
      expect(getByText("Please enter a valid email")).toBeInTheDocument();
    });
  });

  it("redirects after successful login", async () => {
    const history = createMemoryHistory();
    const { getByLabelText, getByTestId } = render(
      <Router history={history}>
        <SignUp />
      </Router>
    );
    fireEvent.input(getByLabelText("Email"), {
      target: { value: "email@example.com" },
    });
    fireEvent.input(getByLabelText("Password"), {
      target: { value: "password" },
    });

    axios.post.mockResolvedValueOnce({ data: {} });

    fireEvent.click(getByTestId("register-button"));

    await waitFor(() => {
      expect(history.location.pathname).toBe("/");
    });
  });
});
