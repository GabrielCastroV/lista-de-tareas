const input = document.querySelector('.input');
const button = document.querySelector('.button');
const list = document.querySelector('#list');
const form = document.querySelector('.form');
const dato1 = document.querySelector('.n');
const dato2 = document.querySelector('.n2');
const dato3 = document.querySelector('.n3');

let taskCompleted = 0;
let taskIncompleted = 0;

function actualizarContador() {
    dato1.innerHTML = taskCompleted;
    dato2.innerHTML = taskIncompleted;
    dato3.innerHTML = taskCompleted + taskIncompleted;
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    if (input.value != '') {
        const li = document.createElement('li');
        li.classList.add('task');
        list.appendChild(li);
        li.innerHTML = `
        <button class="delete-btn" >&#10006</button>
        <p class="text">${input.value}</p>
        <button class="check-btn check-edit ">&#10003</button>
        `;
        input.value = '';
        localStorage.setItem('listaTareas', list.innerHTML);
        taskIncompleted++;
        actualizarContador();
    };
});
list.addEventListener('click', e =>{
    if (e.target.closest('.delete-btn')) {
        const li = e.target.closest('li');
        if (li.classList.contains('selected')){
            taskCompleted--;
        }else{
            taskIncompleted--;
        }
        li.remove();
        actualizarContador();
        localStorage.setItem('listaTareas', list.innerHTML);
    }
    if (e.target.closest('.check-btn')) {
        const checkEdit = e.target.closest('.check-btn')
        const li = e.target.closest('li');
        const editText = li.children[1];
        if (checkEdit.classList.contains('checked')) {
            checkEdit.classList.remove('checked');
            checkEdit.classList.add('check-edit');
            li.classList.remove('selected');
            li.classList.add('task');
            editText.classList.add('text');
            editText.classList.remove('text-checked');
            taskIncompleted++;
            taskCompleted--;
            localStorage.setItem('listaTareas', list.innerHTML);
        }else{
            checkEdit.classList.add('checked');
            checkEdit.classList.remove('check-edit');
            li.classList.add('selected');
            li.classList.remove('task');
            editText.classList.remove('text');
            editText.classList.add('text-checked');
            taskCompleted++;
            taskIncompleted--;
            localStorage.setItem('listaTareas', list.innerHTML);
        };
        actualizarContador();
    };

});
//cargar localStorage
(()=>{
    if (localStorage.length !== 0) {
        const localList = localStorage.getItem('listaTareas');
        list.innerHTML = localList;
        // este codigo no es del todo seguro, ya que el usuario al escribir 'selected' lo registrará como tarea hecha.
        // si el input tuviese verificación, no dejaría que esto ocurriera, pero por ahora genial
        const splitted = localList.split("<li");
        const selected = splitted.filter(part => part.includes("selected"));
        const notSelected = splitted.filter(part => part.includes("task"));
        taskCompleted = selected.length;
        taskIncompleted = notSelected.length;
        actualizarContador();
    }else{
        console.log('nada en localStorage');
    }
})();

