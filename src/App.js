import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library';
import Customer from './components/Customer';


function Index() {
  return <h2>Home</h2>;
}


class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMovie: undefined,
      currentCustomer: undefined,

    }
  }

  onSelectMovie = (movieData) => {
    this.setState({
      currentMovie: {
        title: movieData.title,
      },

    });
  }

  onSelectCustomer = (customerData) => {
    this.setState({
      currentCustomer: {
        name: customerData.name,
      },

    });
  }

  render() {

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/library/">Library</Link>
              </li>
              <li>
                <Link to="/customers/">Customers</Link>
              </li>
            </ul>
          </nav>

          <div>{this.state.currentMovie ? `Selected Movie: ${this.state.currentMovie.title}` : ""}</div>
          <div>{this.state.currentCustomer ? `Selected Customer: ${this.state.currentCustomer.name}` : ""}</div>
          <Route path="/" exact component={Index} />
          <Route path="/library/" render={(props) => <Library {...props} onSelectMovieCallback={this.onSelectMovie} />} />
          <Route path="/customers/" render={(props) => <Customer {...props} onSelectCustomerCallback={this.onSelectCustomer} />} />
        </div>
      </Router>

    );
  }
}

export default AppRouter;
