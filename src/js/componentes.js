import { todoList } from "..";
import { Todo } from "../classes";

const inputNewTodo  = document.querySelector('.new-todo');
const divTodoList   = document.querySelector('.todo-list');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
};

inputNewTodo.addEventListener('keyup', ( event ) => {
    if (event.keyCode === 13 && inputNewTodo.value.length > 0) {
        const nuevoTodo = new Todo( inputNewTodo.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        inputNewTodo.value = '';
    }
});

divTodoList.addEventListener('click', ( { target } ) => {

    const nombreElemento = target.localName;
    const todoElemento   = target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes('input')) {
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    } else if ( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
    
    
});

btnBorrar.addEventListener('click', () => {
    todoList.eliminarcompletados();

    for (let i = divTodoList.children.length - 1 ; i >= 0; i--) {
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);   
        }
    }
});

ulFiltros.addEventListener('click', ( {target} ) => {
    const filtro = target.text;
    if ( !filtro ){ return; }

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if ( completado ) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if ( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});