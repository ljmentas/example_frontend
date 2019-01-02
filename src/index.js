import ReactDOM from 'react-dom'
import React from 'react'
import ResultsTable from './ResultsTable';
import axios from 'axios'


class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {valueWeb: '',valueWord: '', results: null};

    this.handleChangeWeb = this.handleChangeWeb.bind(this);
    this.handleChangeWord = this.handleChangeWord.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeWeb(event) {
    this.setState({valueWeb: event.target.value});
  }

  handleChangeWord(event) {
    this.setState({valueWord: event.target.value});
  }

  handleSubmit(event) {
    //change endpoint
    //error handling needs to be added
    const api = axios.create({baseURL: 'http://ac021a5180cdb11e9bf27123ffb0c525-2028323216.us-east-1.elb.amazonaws.com'})
    api.post('/enqueuejob', {'url': this.state.valueWeb, 'words': this.state.valueWord.split(",")})
      .then(res => {
          this.state.ticket = res.data.message_id
          console.log(res)
    const call_interval = setInterval(
         function() {
           api.get('/getjob/' + this.state.ticket)
           .then(res => {
        if (res.status == 200 && res.data.message) {
          this.setState({'results':res.data.result});
          console.log(res)
          clearInterval(call_interval);
        }
       });

         }
         .bind(this),
         3000
           );
    })
      .catch(error => {
          console.log(error)
    })
    //alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const results = this.state.results;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          web page:
          <input type="text" value={this.state.valueWeb} onChange={this.handleChangeWeb} />
        </label>
        <br />
        <br />
        <label>
          words:
          <input type="text" value={this.state.valueWord} onChange={this.handleChangeWord} />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
         <br />
         <br />
         <br />
         <br />
         { this.state.results ? <ResultsTable results={this.state.results} /> : null }

      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);
