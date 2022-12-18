import checkComplete from './checkComplete.js';
import deleteIcon from './deleteIcon.js';
import {displayTask} from './readTask.js';

/*función llamada addTask, que lo que va a recibir es un evento
y este evento es el que genera el formulario*/
export const addTask = (evento)=> {
  evento.preventDefault();

  //list es el elemento donde se crean las tareas
  const list = document.querySelector('[data-list]');

  //Entrada que el usuario llena con la tarea que va a hacer
  const input = document.querySelector('[data-form-input]');

  //Calendario donde se selecciona la fecha
  const calendar = document.querySelector('[data-form-date]');
  
  //value es el valor de la entrada(input)
  const value = input.value;

  //fecha seleccionada por el usuario
  const date = calendar.value;

  //moment es la libreria que se importo para dar el formato a la fecha
  const dateFormat = moment(date).format('DD/MM/YYYY');
  
  //Si no hay tarea ni fecha no agrega ningún mensaje
  if (value === "" || date === "" ){
    return;
  }

  //limpiar input y calendario para que tengan un string vacio    
  input.value = '';
  calendar.value = "";

  const complete = false;

  //constante que es un objeto donde se almacena value y dateFormat
  const taskObj = {
    value,
    dateFormat,
    complete,
    id: uuid.v4()//identificador único para cada tarea 
  };

  list.innerHTML = '';

  /*El local storage se puede ver en la sección Aplicación de la consola del navegador
  la constante taskList que es igual a lo que almacena Local Storage con la llave task
  lo regresa en un formato JSON y para ser leído se utiliza JSON.parse
  En caso que el valor sea null se genera un arreglo vacio*/
  const taskList = JSON.parse(localStorage.getItem('tasks')) || [];

  //Agrega a taskList la última tarea que se esta registrando
  taskList.push(taskObj);

  /*volver a almacenar nuestro arreglo de tareas ya actualizado y convirtiéndolo 
  con JSON.stringify a un formato JSON */
  localStorage.setItem('tasks', JSON.stringify(taskList));
  
  displayTask();

  /*crear una tarea y va a recibir como parámetro el mismo objeto que nosotros 
  estamos generando aquí arriba 
  const task = createTask(taskObj);

  /*agregar esta tarea a nuestra lista que estamos seleccionando con data atribute. 
  list.appendChild(task);*/
};
  
export const createTask = ({value,dateFormat, complete, id}) => {
  //genera un elemento de tipo li
  const task = document.createElement('li');
        task.classList.add('card');
  
  //genera un elemento de tipo div
  const taskContent = document.createElement('div');
  
  console.log(complete);
  const check = checkComplete(id);

  if (complete){
    console.log('completada');
    check.classList.toggle('fas');
    check.classList.toggle('completeIcon');
    check.classList.toggle('far');
  }
  //genera un elemento de tipo span
  const titleTask = document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText = value;
        taskContent.appendChild(check);
        taskContent.appendChild(titleTask);
    
  const dateElement = document.createElement('span');
        dateElement.innerHTML = dateFormat;
        task.appendChild(taskContent);
        task.appendChild(dateElement);
        task.appendChild(deleteIcon());
    return task;
};