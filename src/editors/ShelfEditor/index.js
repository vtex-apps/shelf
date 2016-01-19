import React from 'react';
import './style.less';

class ShelfEditor extends React.Component {
  constructor(props) {
    super(props);

    let settings = this.props.settings;
    if (settings) {
      this.state = settings.toJS();
      this.state.quantity = this.state.quantity ? this.state.quantity : 4;
    } else {
      this.state = {
        title: '',
        category: '',
        collection: '',
        quantity: 4
      };
    }
  }

  minQuantity = 4

  handleSave = (ev) => {
    ev.preventDefault();
    this.props.saveSettings(this.state);
  }

  incrementQuantity = (ev) => {
    ev.preventDefault();
    let newQuantity = parseInt(this.state.quantity);
    this.setState({
      quantity: newQuantity + 1
    });
  }

  decrementQuantity = (ev) => {
    ev.preventDefault();
    let newQuantity = parseInt(this.state.quantity);

    if (newQuantity === this.minQuantity) {
      return false;
    }

    this.setState({
      quantity: newQuantity - 1
    });
  }

  changeValue = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  changeQuantity = (ev) => {
    let value = ev.target.value;

    if (isNaN(value) || (value !== '' && parseInt(value) < this.minQuantity)) {
      return false;
    }

    value = value === '' ? value : parseInt(value);

    this.setState({
      [ev.target.name]: value
    });
  }

  render() {
    let ActionBar = this.props.actionBar;

    return (
      <div className="ShelfEditor">
        <form className="ShelfEditor__inner" onSubmit={this.handleSave}>
          <div className="ShelfEditor__text-field">
            <label htmlFor="shelf-title">Título da Prateleira</label>
            <input
              id="shelf-title"
              className="form-control"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.changeValue}
              placeholder="Ex: Destaques, Promoção"
            />
          </div>
          <div className="ShelfEditor__text-field">
            <label htmlFor="shelf-category">Categoria</label>
            <input
              id="shelf-category"
              className="form-control"
              name="category"
              type="text"
              value={this.state.category}
              onChange={this.changeValue}
              placeholder="Ex: camiseta, cadeira"
            />
          </div>
          <div className="ShelfEditor__quant-field">
            <label htmlFor="shelf-quantity">Quantidade de Produtos na Prateleira</label>
            <div className="ShelfEditor__quant-selector">
              <button
                className="ShelfEditor__quant-button--left"
                onClick={this.decrementQuantity}
              >
                -
              </button>
              <input
                id="shelf-quantity"
                className="ShelfEditor__quant-selector__input"
                name="quantity"
                type="text"
                value={this.state.quantity}
                onChange={this.changeQuantity}
              />
              <button
                className="ShelfEditor__quant-button--right"
                onClick={this.incrementQuantity}
              >
                +
              </button>
            </div>
          </div>
        </form>

        <ActionBar onSave={this.handleSave} />
      </div>
    );
  }
}

export default ShelfEditor;
