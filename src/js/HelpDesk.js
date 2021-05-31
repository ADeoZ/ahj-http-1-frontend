import Item from './Item';
import Modal from './Modal';
import Request from './Request';

export default class HelpDesk {
  constructor(element) {
    this.table = element.querySelector('.helpdesk__table');
    this.add = element.querySelector('.helpdesk__add');

    this.modal = new Modal();
    this.items = [];

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
  }

  init() {
    this.add.addEventListener('click', () => {
      this.modal.createModal();
      this.modal.showModal(this.addItem);
    });

    this.showTable();
  }

  showTable() {
    const itemsRequest = Request.allTickets();
    itemsRequest.then((resolve) => {
      this.items = [];
      this.table.innerHTML = '';

      JSON.parse(resolve).forEach((item) => {
        const itemClass = new Item(item.id, item.name, item.status, item.created);
        this.items.push(itemClass);
      });

      for (const item of this.items) {
        this.table.append(item.node);
      }

      this.table.addEventListener('click', this.changeItem);
    });
  }

  addItem() {
    this.modal.closeModal();

    const createRequest = Request.createTicket(
      this.modal.inputName.value, this.modal.inputDescription.value, 0,
    );
    createRequest.then((resolve) => {
      if (resolve === 'Ok') {
        this.showTable();
      }
    });
  }

  changeItem(event) {
    const targetItem = event.target.closest('div.helpdesk__item');
    const item = this.items.find((itemFind) => itemFind.node === targetItem);
    if (event.target.classList.contains('helpdesk__item__status')) {
      this.editItemStatus(item.id);
    }
    if (event.target.classList.contains('helpdesk__item__name') || event.target.classList.contains('helpdesk__item__description')) {
      const itemDescription = targetItem.querySelector('.helpdesk__item__description');
      if (itemDescription) {
        itemDescription.remove();
      } else {
        this.showItemDescription(item);
      }
    }
    if (event.target.classList.contains('helpdesk__item__edit')) {
      if (!item.description) {
        const createRequest = Request.ticketById(item.id);
        createRequest.then((resolve) => {
          const { description } = JSON.parse(resolve);
          item.description = description;
          this.modal.createModal();
          this.modal.showModal(() => this.editItem(item), item);
        });
      } else {
        this.modal.createModal();
        this.modal.showModal(() => this.editItem(item), item);
      }
    }
    if (event.target.classList.contains('helpdesk__item__delete')) {
      this.modal.showWarning(() => this.deleteItem(item.id));
    }
  }

  editItem(item) {
    this.modal.closeModal();

    const createRequest = Request.editTicket(
      item.id, this.modal.inputName.value, this.modal.inputDescription.value,
    );
    createRequest.then((resolve) => {
      if (resolve === 'Ok') {
        this.showTable();
      }
    });
  }

  editItemStatus(id) {
    const createRequest = Request.changeStatus(id);
    createRequest.then((resolve) => {
      if (resolve === 'Ok') {
        this.showTable();
      }
    });
  }

  deleteItem(id) {
    this.modal.closeModal();

    const createRequest = Request.removeById(id);
    createRequest.then((resolve) => {
      if (resolve === 'Ok') {
        this.showTable();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  showItemDescription(item) {
    if (!item.description) {
      const createRequest = Request.ticketById(item.id);
      createRequest.then((resolve) => {
        const description = document.createElement('div');
        description.classList.add('helpdesk__item__description');
        // eslint-disable-next-line no-param-reassign
        item.description = JSON.parse(resolve).description;
        description.innerText = item.description;
        item.node.append(description);
      });
    } else {
      const description = document.createElement('div');
      description.classList.add('helpdesk__item__description');
      description.innerText = item.description;
      item.node.append(description);
    }
  }
}
