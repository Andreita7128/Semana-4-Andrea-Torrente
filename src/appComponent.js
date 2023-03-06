import { TodoListDataServices } from "./services/toDoListServices.js";

const AppTemplate = document.createElement("template");
AppTemplate.innerHTML = `
    <style>
        @import url('./src/appComponent.css')
    </style>
    <div class="app-component">
        <div class="to-do-list-container">
            <h1>To Do List</h1>
            <div class="to-do-items">
            </div>
            <button class="add-to-do-item-btn">+</button>
        </div>
    </div>
`;

export class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(AppTemplate.content.cloneNode(true));

        TodoListDataServices.initilalizeState([]);

        this.todoList = this.shadowRoot.querySelector(".to-do-list-container");
        this.todoItems = this.todoList.querySelector(".to-do-items");
        this.addTodoItemBtn = this.todoList.querySelector(".add-to-do-item-btn");
    }

    connectedCallback() {
        this.addTodoItemBtn.addEventListener("click", (e) =>
            this.addTodoItem(e)
        );
    }

    addTodoItem(e) {
        e.stopPropagation();
        let todoItem = document.createElement("todo-item");

        AppComponent.todoIdCount = AppComponent.todoIdCount ?? 0;
        todoItem.id = AppComponent.todoIdCount++;

        this.todoItems.appendChild(todoItem);
    }

    disconnectedCallback() {}
}