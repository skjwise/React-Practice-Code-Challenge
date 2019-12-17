import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushiList: [],
    eaten: [],
    // balance: Math.floor(Math.random() * 50) +15,
    balance: 100,
    displayIndex: 0
  }

  fetchSushi = () => {
    fetch(API)
    .then(resp => resp.json())
    .then( sushis => this.setState({sushiList: sushis}))  
  }

  componentDidMount() {
    this.fetchSushi();
  }

  eat = sushi => {
    if (!this.state.eaten.includes(sushi) && this.state.balance >= sushi.price){
      const newBalance = this.state.balance - sushi.price
      this.setState({
        eaten: [...this.state.eaten, sushi],
        balance: newBalance
      })
    }
  }

  fourSushis = () => {
    return this.state.sushiList.slice(this.state.displayIndex, this.state.displayIndex+4)
  }
  more = event => {
    let newDisplayIndex = this.state.displayIndex + 4
    if (newDisplayIndex >= this.state.sushiList.length){
      newDisplayIndex = 0
    }
    this.setState({
      displayIndex: newDisplayIndex
    })
  }
   
  // bonus
  addMoney = event => {
    event.preventDefault();
    let addedMoney = parseInt(event.target.children[0].value)
    if (!addedMoney){addedMoney = 0}
    this.setState({
      balance: this.state.balance + addedMoney
    })
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.addMoney}>Add Money to Balance
        <input type="text" placeholder="add money here!" />
        <input type="submit"/>
        </form>
        
        <SushiContainer sushiList={this.fourSushis()} more={this.more} eat={this.eat} eaten={this.state.eaten} />
        <Table eaten={this.state.eaten} balance={this.state.balance} />
      </div>
    );
  }
}

export default App;