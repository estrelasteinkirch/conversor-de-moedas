import React, { Component } from "react";
import "./Conversor.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moedaA: "BRL",
      moedaB: "USD",
      moedaA_valor: "", //ele é vazio pois é o dado que vem no input
      moedaB_valor: 0 // é o dado da calculado depois de converter
    };
  }

  converter = () => {
    let de_para = `${this.state.moedaA}_${this.state.moedaB}`;
    let url = `https://free.currencyconverterapi.com/api/v6/convert?q=${de_para}&compact=ultra&apiKey=94e3a6058cc173578a21`;

    fetch(url)
      .then(res => res.json())
      .then(json => {
        let cotacao = json[de_para];

        let moedaB_valor = parseFloat(
          this.state.moedaA_valor * cotacao
        ).toFixed(2);
        this.setState({ moedaB_valor });
        //variável tem o mesmo nome da chave
      });
  };

  render() {
    return (
      <section className="Conversor">
        <div className="valor-conversao">
          <Form.Group controlId="titulo-conversao">
            <Form.Label className="label">Quero Converter:</Form.Label>
            <Form.Control
              size="lg"
              type="text"
              placeholder="Valor"
              onChange={event => {
                this.setState({ moedaA_valor: event.target.value });
              }}
            />
          </Form.Group>
        </div>

        <div className="de-para">
        <Form.Group controlId="input-de">
          <Form.Label className="label">De:</Form.Label>
          <Form.Control
            as="select"
            className="moeda"
            value={this.state.moedaA}
            onChange={event => {
              this.setState({ moedaA: event.target.value });
            }}
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
          </Form.Control>
        </Form.Group>

        <Button
          variant="outline-success"
          className="btn-inverter"
          onClick={event => {
            const antigoA = this.state.moedaA;
            const antigoB = this.state.moedaB;
            this.setState({ moedaA: antigoB, moedaB: antigoA });
          }}
        >
          Inverter
        </Button>

        <Form.Group controlId="input-para">
          <Form.Label className="label">Para:</Form.Label>
          <Form.Control
            as="select"
            className="moeda"
            value={this.state.moedaB}
            onChange={event => {
              this.setState({ moedaB: event.target.value });
            }}
          >
            <option value="USD">USD</option>
            <option value="BRL">BRL</option>
            <option value="EUR">EUR</option>
            <option value="CAD">CAD</option>
          </Form.Control>
        </Form.Group>
        </div>
        <Button
          variant="success"
          size="lg"
          block
          onClick={this.converter}
        >
          Converter
        </Button>

        <div className="convertido">
          <h2>
            {this.state.moedaB_valor} {this.state.moedaB}
          </h2>
        </div>
      </section>
    );
  }
}
