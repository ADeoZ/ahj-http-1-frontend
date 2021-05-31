/* eslint-disable consistent-return */
export default class Request {
  constructor() {
    // this.server = 'http://localhost:7070/';
    this.server = 'https://ahj-http-1.herokuapp.com/';
  }

  static get(params) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('GET', `https://ahj-http-1.herokuapp.com/?${params}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(xhr.response);
          } catch (e) {
            // console.error(e);
            reject(e);
          }
        }
      });
      xhr.send();
    });
  }

  static post(params, fields) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.open('POST', `https://ahj-http-1.herokuapp.com/?${params}`);
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(xhr.response);
          } catch (e) {
          // console.error(e);
            reject(e);
          }
        }
      });
      xhr.send(fields);
    });
  }

  static allTickets() {
    const result = Request.get('method=allTickets');
    return result;
  }

  static ticketById(id) {
    const result = Request.get(`method=ticketById&id=${id}`);
    return result;
  }

  static createTicket(name, description, status) {
    const fields = new URLSearchParams();
    fields.append('name', name);
    fields.append('description', description);
    fields.append('status', status);
    const result = Request.post('method=createTicket', fields);
    return result;
  }

  static removeById(id) {
    const fields = new URLSearchParams();
    fields.append('curid', id);
    const result = Request.post('method=removeTicket', fields);
    return result;
  }

  static changeStatus(id) {
    const fields = new URLSearchParams();
    fields.append('curid', id);
    const result = Request.post('method=ticketStatus', fields);
    return result;
  }

  static editTicket(id, name, description) {
    const fields = new URLSearchParams();
    fields.append('curid', id);
    fields.append('name', name);
    fields.append('description', description);
    const result = Request.post('method=editTicket', fields);
    return result;
  }
}
