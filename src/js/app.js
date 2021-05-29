// TODO: write code here

const server = 'https://ahj-http-1.herokuapp.com/';
// const server = 'http://localhost:7070/';

const clickme = document.querySelector('.test');
clickme.addEventListener('click', () => {
  // const params = 'method=ticketById&id=4';
  const params = 'method=allTickets';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${server}?${params}`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        console.log(xhr.response);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send();
});

const postButton = document.querySelector('.post');
postButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  const params = new URLSearchParams();

  params.append('name', 'Тестовый тикет');
  params.append('description', 'Пробуем загрузить новый тикет и получить по нему информацию');
  params.append('status', 0);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${server}?method=createTicket`);
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        console.log(xhr.response);
      } catch (e) {
        console.error(e);
      }
    }
  });
  xhr.send(params);
});

console.log(server);
