'use strict';

let contador = 0;

const createPublicationCode = (name, content) => {
 const container = document.createElement('div');
 const publication = document.createElement('div');
 const titleName = document.createElement('h3');
 const titleContent = document.createElement('p');
 const comments = document.createElement('div');
 const titleComment = document.createElement('h4');
 const sendComment = document.createElement('div');
 const inputComment = document.createElement('input');
 const inputSend = document.createElement('input');

 container.classList.add('publications');
 publication.classList.add('puclication');
 titleName.classList.add('name');
 comments.classList.add('comments');
 titleComment.classList.add('title-comment');
 sendComment.classList.add('send-comment');
 inputComment.classList.add('input-comment');
 inputSend.classList.add('input-send');

 inputComment.setAttribute('type', 'text');
 inputSend.setAttribute('type', 'submit');

 inputSend.value = 'Send';
 inputComment.placeholder = 'Write your comments';
 titleComment.textContent = 'comments';
 titleContent.textContent = content;
 titleName.textContent = name;

 sendComment.appendChild(inputComment);
 sendComment.appendChild(inputSend);

 comments.appendChild(titleComment);
 comments.appendChild(sendComment);

 publication.appendChild(titleName);
 publication.appendChild(titleContent);
 publication.appendChild(comments);

 container.appendChild(publication);

 return container;
}

const loadPlusPublication = entry => {
 if (entry[0].isIntersecting) loadPublication(4);
}

let observer = new IntersectionObserver(loadPlusPublication);

const loadPublication = async num => {
 let resultado;
 let peticion;
 let arr;

 try {
  peticion = await fetch('info.json');
  resultado = await peticion.json();
  arr = await resultado.content;
  const fracment = document.createDocumentFragment();

  for (let i = 0; i < num; i++) {
   if (arr[contador] !== undefined) {
    const container = createPublicationCode(arr[contador].nombre, arr[contador].contenido);
    fracment.appendChild(container);
    contador++;
    if (i == num - 1) observer.observe(container);
   } else {
    if (document.body.lastElementChild.id != 'noMore') {
     let noMore = document.createElement('p');
     noMore.id = 'noMore';
     noMore.textContent = 'No more publication';
     fracment.appendChild(noMore);
     break;
    }
   }
  }
  document.body.appendChild(fracment);
 } catch (error) {
  console.error(error);
 }
}

loadPublication(5);
