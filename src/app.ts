import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput("project-input", "app");
new ProjectList("active", "project-list", "app");
new ProjectList("finished", "project-list", "app");

