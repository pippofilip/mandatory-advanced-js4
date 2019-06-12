import React, { Component } from 'react';
import App from './App'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.play = this.play.bind(this);
  }

  render() {
    return (
      <>
    const Around = ({ row, play }) => {
       console.log(row) // löst?, vad gör jag fel här?
       return (
         <tr>
           {row.map((cell, i) => <Back  value={cell} ind={i} play={play} />)}
         </tr>

    //   );
    // };
      </>
      );
    }
  }




