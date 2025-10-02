import { render } from "preact";
import "./index.css";
import { TestcardPage } from "./components/TestcardPage";

render(<TestcardPage />, document.getElementById("app")!);
