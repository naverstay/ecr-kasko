import React from 'react';
import PageLayout from "./layouts/page-layout";
import Home from "./pages/home";
import Kasko from "./pages/kasko";
import './App.scss';
import {BrowserRouter, Link, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <PageLayout>
            <div className="dev-navigation">
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/kasko">kasko</Link>
                    </li>
                    <li>
                        <Link to="/offers">offers</Link>
                    </li>
                </ul>
            </div>
            <Route exact path="/" component={Home} />
            <Route path="/kasko" render={(routeProps) => (
                <Kasko {...routeProps} showOffers={false} />
            )} />
            <Route path="/offers" render={(routeProps) => (
                <Kasko {...routeProps} showOffers={'каско'}/>
            )}/>
        </PageLayout>
      </BrowserRouter>

  )
}

export default App;
