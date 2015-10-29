import React from 'react';
import './ShelfEditor.less';

class ShelfEditor extends React.Component {
  constructor(props) {
    super(props);

    let settings = this.props.settings;
    if (settings) {
      this.state = settings.toJS();
    } else {
      this.state = {
        title: '',
        category: '',
        quantity: 1
      };
    }
  }

  maxQuantity = 6
  minQuantity = 1

  saveSettings = () => {
    this.props.saveSettings(this.state);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    this.handleSave(ev);
  }

  handleSave = (ev) => {
    ev.preventDefault();
    this.saveSettings();
  }

  incrementQuantity(ev) {
    ev.preventDefault();
    if (parseInt(this.state.quantity) === this.maxQuantity) {
      return false;
    }
    this.setState({
      quantity: (parseInt(this.state.quantity) + 1)
    });
  }

  decrementQuantity(ev) {
    ev.preventDefault();
    if (parseInt(this.state.quantity) === this.minQuantity) {
      return false;
    }
    this.setState({
      quantity: (parseInt(this.state.quantity) - 1)
    });
  }

  changeValue(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }

  changeQuantity(ev) {
    let value = ev.target.value;
    if (isNaN(value) || (value !== '' && parseInt(value) < this.minQuantity || parseInt(value) > this.maxQuantity)) {
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
      <div className="v-shelf-ed">
        <form className="v-shelf-ed__inner" onSubmit={this.handleSubmit.bind(this)}>
          <div className="v-shelf-ed__text-field">
            <label htmlFor="shelf-title">Título da Prateleira</label>
            <input id="shelf-title" className="form-control" name="title" type="text"
                   value={this.state.title} onChange={this.changeValue.bind(this)}
                   placeholder="Ex: Destaques, Promoção"/>
          </div>
          <div className="v-shelf-ed__text-field">
            <label htmlFor="shelf-category">Categoria</label>
            <input id="shelf-category" className="form-control" name="category" type="text"
                   value={this.state.category} onChange={this.changeValue.bind(this)}
                   placeholder="Ex: camiseta, cadeira"/>
          </div>
          <div className="v-shelf-ed__quant-field">
            <label htmlFor="shelf-quantity">Quantidade de Produtos na Prateleira</label>
            <div className="v-shelf-ed__quant-selector">
              <button className="v-shelf-ed__quant-button--left" onTouchTap={this.decrementQuantity.bind(this)}> - </button>
                <input id="shelf-quantity" className="v-shelf-ed__quant-selector__input" name="quantity" type="text"
                       value={this.state.quantity} onChange={this.changeQuantity.bind(this)}/>
              <button className="v-shelf-ed__quant-button--right" onTouchTap={this.incrementQuantity.bind(this)}> + </button>
            </div>
          </div>
        </form>

        <ActionBar onSave={this.handleSave.bind(this)}/>
      </div>
    );
  }
}

export default ShelfEditor;
