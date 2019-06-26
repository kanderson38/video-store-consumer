import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Library from './components/Library';
import Customer from './components/Customer';
import Search from './components/Search'
import axios from "axios";
import './App.css'

function Index() {
  return <h2>Home</h2>;
}


class AppRouter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMovie: undefined,
      currentCustomer: undefined,
      selectedPage: "/"

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
        id: customerData.id
      },

    });
  }

  setSelectedPage = (event) => {
    this.setState({
      selectedPage: window.location.pathname,
    });
    console.log(window.location.pathname);
  }

  makeRental = (event) => {
    event.preventDefault();
    const rentalData = {
      title: this.state.currentMovie.title, 
      customer_id: this.state.currentCustomer.id, 
      due_date: new Date("2020-06-06")
    };

    const rentalURL = `http://localhost:3001/rentals/Psycho/check-out`
    axios.post(rentalURL, rentalData)
      .then((response) => {
        console.log(rentalURL);
      })
      .catch((error) => {
        console.log(error);
      })
  }


  render() {
    return (
      <Router>
        <div className="full-wrapper">
          <nav>
            <ul>
              <li className={this.state.selectedPage === "/" ? "selected" : ""}>
                <span onClick={this.setSelectedPage}><Link to="/">Home</Link></span>
              </li>
              <li className={this.state.selectedPage === "/library/" ? "selected" : ""}>
                <span onClick={this.setSelectedPage}><Link to="/library/">Library</Link></span>
              </li>
              <li className={this.state.selectedPage === "/customers/" ? "selected" : ""}>
                <span onClick={this.setSelectedPage}><Link to="/customers/">Customers</Link></span>
              </li>
              <li className={this.state.selectedPage === "/search/" ? "selected" : ""}>
                <span onClick={this.setSelectedPage}><Link to="/search/">Search</Link></span>
              </li>
            </ul>
          </nav>
          <main>
            <div className="selected-movie">{this.state.currentMovie ? `Selected Movie: ${this.state.currentMovie.title}` : ""}</div>
            <div className="selected-customer">{this.state.currentCustomer ? `Selected Customer: ${this.state.currentCustomer.name}` : ""}</div>
            <div className={this.state.currentCustomer && this.state.currentMovie ? "checkout-button" : "hidden"}><span 
            onClick = {this.makeRental}
            >Check Movie Out</span></div>
            <Route path="/" exact component={Index} />
            <Route path="/library/" render={(props) => <Library {...props} onSelectMovieCallback={this.onSelectMovie} />} />
            <Route path="/customers/" render={(props) => <Customer {...props} onSelectCustomerCallback={this.onSelectCustomer} />} />
            <Route path="/search/" render={(props) => <Search {...props} />} />
          </main>
        </div>
      </Router>

    );
  }

  // render() {

  //   return (
  //     <Router>
  //       <div>
  //         <nav>
  //           <ul>
  //             <li>
  //               <Link to="/">Home</Link>
  //             </li>
  //             <li>
  //               <Link to="/library/">Library</Link>
  //             </li>
  //             <li>
  //               <Link to="/customers/">Customers</Link>
  //             </li>
  //             <li>
  //               <Link to="/search/">Search</Link>
  //             </li>
  //           </ul>
  //         </nav>

  //         <span>{this.state.currentMovie ? `Selected Movie: ${this.state.currentMovie.title}` : ""}</span>
  //         <Route path="/" exact component={Index} />
  //         <Route path="/library/" render={(props) => <Library {...props} onSelectMovieCallback={this.onSelectMovie} />} />
  //         <Route path="/customers/" render={(props) => <Customer {...props} onSelectCustomerCallback={this.onSelectCustomer} />} />
  //         <Route path="/search/" render={(props) => <Search {...props}  />} />
  //       </div>
  //     </Router>
  //   )

  // };
}

export default AppRouter;
