import React from 'react';
import './ShelfEditor.less';

class ShelfEditor extends React.Component {
  componentWillMount() {
    const settings = this.props.settings ?
      this.props.settings.toJS() : null;

    if (settings) {
      this.setState({
        ...settings,
        quantity: settings.quantity || 4,
        inputQty: settings.quantity || 4,
        desktopQty: settings.desktopQty || 4,
        tabletQty: settings.tabletQty || 2
      });
    } else {
      this.setState({
        title: '',
        category: '',
        collection: '',
        quantity: 4,
        inputQty: 4,
        desktopQty: 4,
        tabletQty: 2
      });
    }
  }

  handleSave = (e) => {
    e.preventDefault();
    const { inputQty, ...settings } = this.state;
    this.props.saveSettings(settings);
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    let changes = {};

    if (name.indexOf('quantity') !== -1) {
      const intValue = value.length === 0 ? 0 : parseInt(value, 10);
      value = intValue < 4 ? 4 : intValue;
      changes.inputQty = e.target.value;
    }

    if (name.indexOf('Qty') !== -1) {
      value = parseInt(value, 10);
    }

    changes[name] = value;
    this.setState(changes);
  }

  handleBlur = () => this.setState({ inputQty: this.state.quantity });

  incrementQuantity = (e) => {
    e.preventDefault();
    const newQuantity = this.state.quantity + 1;
    this.setState({ quantity: newQuantity, inputQty: newQuantity });
  }

  decrementQuantity = (e) => {
    e.preventDefault();
    const newQuantity = this.state.quantity - 1;
    this.setState({ quantity: newQuantity, inputQty: newQuantity });
  }

  render() {
    const ActionBar = this.props.actionBar;

    return (
      <div className="ShelfEditor">
        <form className="ShelfEditor__inner" onSubmit={this.handleSave}>
          <div className="ShelfEditor__text-field">
            <label htmlFor="shelf-title">Título</label>
            <input
              id="shelf-title"
              className="form-control"
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
              placeholder="Ex: camiseta, cadeira"
            />
          </div>
          <div className="ShelfEditor__quant-field">
            <label htmlFor="shelf-quantity">
              Quantidade de produtos total
            </label>
            <div className="ShelfEditor__quant-selector">
              <button
                className="ShelfEditor__quant-button--left"
                onClick={this.decrementQuantity}
                disabled={this.state.quantity === 4}
              >
                -
              </button>
              <input
                id="shelf-quantity"
                className="ShelfEditor__quant-selector__input"
                name="quantity"
                type="text"
                value={this.state.inputQty}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
              />
              <button
                className="ShelfEditor__quant-button--right"
                onClick={this.incrementQuantity}
              >
                +
              </button>
            </div>
            <br />
            <label htmlFor="shelf-quantity-desktop">
              Quantidade de produtos para exibição (Desktop)
            </label>
            <div className="ShelfEditor__quant-selector">
              <select
                id="shelf-quantity-desktop"
                className="form-control"
                name="desktopQty"
                value={this.state.desktopQty}
                onChange={this.handleChange}
              >
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <br />
            <label htmlFor="shelf-quantity-tablet">
              Quantidade de produtos para exibição (Tablet)
            </label>
            <div className="ShelfEditor__quant-selector">
              <select
                id="shelf-quantity-tablet"
                className="form-control"
                name="tabletQty"
                value={this.state.tabletQty}
                onChange={this.handleChange}
              >
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>
        </form>

        <ActionBar
          id={this.props.componentProps.id}
          onSave={this.handleSave}
        />
      </div>
    );
  }
}

export default ShelfEditor;
