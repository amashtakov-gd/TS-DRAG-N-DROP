import { Component } from "./base-component";
import { DropTarget } from "../models/drag-and-drop";
import { ProjectType, ProjectStatus, Project } from "../models/project";
import { projectState } from "../state/project-state";
import { ProjectItem } from "./project-item";
import { autobind } from "../decorators/autobind";

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DropTarget
{
  type: ProjectType;
  projects: Project[] = [];

  constructor(type: ProjectType, templateId: string, hostId: string) {
    super(templateId, hostId, false, `${type}-projects`);
    this.type = type;

    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      this.projects = projects.filter((project) => {
        if (this.type === "active") {
          return project.status === ProjectStatus.Active;
        } else {
          return project.status === ProjectStatus.Finished;
        }
      });

      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjects() {
    const ul = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    ul.innerHTML = "";
    for (const project of this.projects) {
      new ProjectItem(ul.id, project);
    }
  }

  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer!.types[0] === "text/plain") {
      event.preventDefault();

      const ul = this.element.querySelector("ul")!;
      ul.classList.add("droppable");
    }
  }

  @autobind
  dropHandler(event: DragEvent) {
    const projectId = event.dataTransfer?.getData("text/plain");
    if (projectId) {
      projectState.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }
  }

  @autobind
  dragLeaveHandler(_: DragEvent) {
    const ul = this.element.querySelector("ul")!;
    ul.classList.remove("droppable");
  }
}
