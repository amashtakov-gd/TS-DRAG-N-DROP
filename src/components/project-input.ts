import { Component } from "./base-component";
import { validate } from "../util/validation"
import { projectState } from "../state/project-state";
import { autobind } from "../decorators/autobind";

export class ProjectInput extends Component<HTMLFormElement, HTMLElement> {
  formTitleElement: HTMLInputElement;
  formDescriptionElement: HTMLInputElement;
  formPeopleElement: HTMLInputElement;

  constructor(templateId: string, hostId: string) {
    super(templateId, hostId, true, "user-input");

    this.formTitleElement = this.element.querySelector("#title")!;
    this.formDescriptionElement = this.element.querySelector("#description")!;
    this.formPeopleElement = this.element.querySelector("#people")!;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.formSubmitHandler);
  }

  renderContent() {}

  private getInputs(): [string, string, number] | void {
    const title = this.formTitleElement.value;
    const description = this.formDescriptionElement.value;
    const people = this.formPeopleElement.value;

    if (
      !validate({ value: title, required: true }) ||
      !validate({ value: description, required: true, minLength: 5 }) ||
      !validate({ value: +people, required: true, min: 1, max: 5 })
    ) {
      alert("Please provide valid input !");
      return;
    } else {
      return [
        this.formTitleElement.value,
        this.formDescriptionElement.value,
        +this.formPeopleElement.value,
      ];
    }
  }

  private clearInputs() {
    this.formTitleElement.value = "";
    this.formDescriptionElement.value = "";
    this.formPeopleElement.value = "";
  }

  @autobind
  private formSubmitHandler(event: Event) {
    event.preventDefault();
    const inputs = this.getInputs();
    if (Array.isArray(inputs)) {
      const [title, description, people] = inputs;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }
}
