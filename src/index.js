import ReactDOM from "react-dom";
import React, { Component } from "react";

class EmailConvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      text: "",
      emails: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      list: prevState.list.concat(this.state.text),
      text: ""
    }));
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  removeItem(index) {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list });
  }

  convertHandler = () => {
    this.state.list.forEach(element => {
      const map = Array.prototype.map;
      const allEmails = [];
      let counter = 0;
      let eachEmail = [];

      map.call(element, eachword => {
        if (eachword === '"') {
          if (counter % 2 === 0 && counter !== 0) {
            let toPushEmail = [...eachEmail];
            eachEmail = [];
            allEmails.push(toPushEmail.join(""));
          }
          counter++;
        } else if (eachword !== " ") {
          eachEmail.push(eachword);
        }
      });
      let convertedEmails = allEmails.join(",");
      this.setState({
        emails: convertedEmails
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Email LIST</h1>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.text} onChange={e => this.handleChange(e)} />
          <button>Add</button>
          {this.state.list.map((item, index) => {
            return (
              <h6 key={index}>
                {item}
                <button onClick={() => this.removeItem(index)}>Delete</button>
              </h6>
            );
          })}
        </form>
        <button onClick={this.convertHandler}>Convert</button>
        <div>{this.state.emails}</div>
      </div>
    );
  }
}

ReactDOM.render(<EmailConvert />, document.getElementById("root"));
