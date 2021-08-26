import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { bankOne, bankTwo } from "./constants";

test("should render Drums and controls", () => {
  render(<App />);
  expect(screen.getAllByText(/[QWEASDZXC]/)).toHaveLength(9);
  expect(screen.getByText(/Power/i)).toBeInTheDocument();
  expect(screen.getByText(/Bank/i)).toBeInTheDocument();
});

describe("test if audio elements are playing after button click", () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => {
      /* do nothing */
    };
    window.HTMLMediaElement.prototype.pause = () => {
      /* do nothing */
    };
  });
  test("should play sounds when i use cursor/touch - bankOne", async () => {
    const { container } = render(<App />);
    bankOne.forEach(async ({ keyTrigger, id }) => {
      const drum = screen.getByText(keyTrigger);
      const drumAudio = drum.firstChild;
      fireEvent.click(drum);
      const idSplit = id.split("-");
      const re = new RegExp(
        idSplit[0] + (idSplit[1] ? " " + idSplit[1] : ""),
        "i"
      );
      await waitFor(() => {
        expect(drumAudio.currentTime).toBeGreaterThan(0);
        expect(container.querySelector("#display")).toHaveTextContent(re);
      });
    });
  });
  test("should play sounds when i use cursor/touch - bankTwo", async () => {
    const { container } = render(<App />);
    bankTwo.forEach(async ({ keyTrigger, id }) => {
      const drum = screen.getByText(keyTrigger);
      const drumAudio = drum.firstChild;
      fireEvent.click(drum);
      const idSplit = id.split("-");
      const re = new RegExp(
        idSplit[0] + (idSplit[1] ? " " + idSplit[1] : ""),
        "i"
      );
      await waitFor(() => {
        expect(drumAudio.currentTime).toBeGreaterThan(0);
        expect(container.querySelector("#display")).toHaveTextContent(re);
      });
    });
  });
  test("should play sounds when using keyboard - bankOne", async () => {
    const { container } = render(<App />);
    bankOne.forEach(async ({ keyTrigger, id }) => {
      fireEvent.keyDown(document);
      const idSplit = id.split("-");
      const re = new RegExp(
        idSplit[0] + (idSplit[1] ? " " + idSplit[1] : ""),
        "i"
      );
      await waitFor(() => {
        expect(
          container.querySelector(`#${keyTrigger}`).currentTime
        ).toBeGreaterThan(0);
        expect(container.querySelector("#display")).toHaveTextContent(re);
      });
    });
  });
  test("should play sounds when using keyboard - bankTwo", async () => {
    const { container } = render(<App />);
    bankTwo.forEach(async ({ keyTrigger, id }) => {
      fireEvent.keyDown(document);
      const idSplit = id.split("-");
      const re = new RegExp(
        idSplit[0] + (idSplit[1] ? " " + idSplit[1] : ""),
        "i"
      );
      await waitFor(() => {
        expect(
          container.querySelector(`#${keyTrigger}`).currentTime
        ).toBeGreaterThan(0);
        expect(container.querySelector("#display")).toHaveTextContent(re);
      });
    });
  });
});
