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
                    <li>
                        <Link to="/payment">payment</Link>
                    </li>
                    <li>
                        <Link to="/done">done</Link>
                    </li>
                </ul>
            </div>
            <Route exact path="/" render={(routeProps) => (
                <Kasko {...routeProps} step={1} showOffers={false}/>
            )}/>
            <Route exact path="/ecr-kasko" component={Home} />
            <Route path="/kasko" render={(routeProps) => (
                <Kasko {...routeProps} showOffers={false} />
            )} />
            <Route path="/offers" render={(routeProps) => (
                <Kasko {...routeProps} showOffers={'каско'}/>
            )}/>
            <Route path="/payment" render={(routeProps) => (
                <Kasko {...routeProps} step={2} showOffers={'каско'}/>
            )}/>
            <Route path="/done" render={(routeProps) => (
                <Kasko {...routeProps} step={3} showOffers={'каско'}/>
            )}/>
        </PageLayout>
      </BrowserRouter>
  )
}

export default App;
