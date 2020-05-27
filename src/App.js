import React from 'react';
import PageLayout from "./layouts/page-layout";
import Home from "./pages/home";
import Kasko from "./pages/kasko";
import './App.scss';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Credit from "./pages/credit";
import Osago from "./pages/osago";

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
                    <li>
                        <Link to="/credit">credit</Link>
                    </li>
                    <li>
                        <Link to="/osago">osago</Link>
                    </li>
                    <li>
                        <Link to="/osago_payment">osago_payment</Link>
                    </li>
                    <li>
                        <Link to="/osago_done">osago_done</Link>
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
            <Route path="/credit" render={(routeProps) => (
                <Credit {...routeProps} showOffers={'кредит'}/>
            )}/>
            <Route path="/osago" render={(routeProps) => (
                <Osago {...routeProps} showOffers={false}/>
            )}/>
            <Route path="/osago_payment" render={(routeProps) => (
                <Osago {...routeProps} step={2} showOffers={'осаго'}/>
            )}/>
            <Route path="/osago_done" render={(routeProps) => (
                <Osago {...routeProps} step={3} showOffers={'осаго'}/>
            )}/>
        </PageLayout>
      </BrowserRouter>
  )
}

export default App;
