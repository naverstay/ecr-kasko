import React from 'react';
import PageLayout from "./layouts/page-layout";
import Home from "./pages/home";
import Kasko from "./pages/kasko";
import './App.scss';
import {BrowserRouter, Link, Route} from "react-router-dom";
import Credit from "./pages/credit";
import Osago from "./pages/osago";
import Orders from "./pages/orders";
import CheryLayout from "./layouts/chery-layout";
import Chat from "./components/orders/chat";

function App() {
  return (
      <BrowserRouter>
          <div className="dev-navigation">
              <ul>
                  <li>
                      <Link to="/">home</Link>
                  </li>
                  <li>
                      <Link to="/kasko">kasko</Link>
                  </li>
                  <li>
                      <Link to="/kasko_payment">kasko_payment</Link>
                  </li>
                  <li>
                      <Link to="/kasko_done">kasko_done</Link>
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
                  <li>
                      <Link to="/credit">credit</Link>
                  </li>
                  <li>
                      <Link to="/credit_kasko">credit_kasko</Link>
                  </li>
                  <li>
                      <Link to="/chery">chery</Link>
                  </li>
                  <li>
                      <Link to="/orders">orders</Link>
                  </li>
              </ul>
          </div>
          
            <Route exact path="/" render={(routeProps) => (
                <PageLayout>
                    <Kasko {...routeProps} step={1} showOffers={false}/>
                </PageLayout>
            )}/>
            <Route path="/kasko" render={(routeProps) => (
                <PageLayout>
                    <Kasko {...routeProps} showOffers={'каско'}/>
                </PageLayout>
            )} />
            <Route path="/kasko_payment" render={(routeProps) => (
                <PageLayout>
                    <Kasko {...routeProps} step={2} showOffers={'каско'}/>
                </PageLayout>
            )}/>
            <Route path="/kasko_done" render={(routeProps) => (
                <PageLayout>
                    <Kasko {...routeProps} step={3} showOffers={'каско'}/>
                </PageLayout>
            )}/>
            <Route path="/credit" render={(routeProps) => (
                <PageLayout>
                    <Credit {...routeProps} showOffers={'кредит'}/>
                </PageLayout>
            )}/>
            <Route path="/credit_kasko" render={(routeProps) => (
                <PageLayout>
                    <Credit {...routeProps} kasko={true} showOffers={'кредит'}/>
                </PageLayout>
            )}/>
            <Route path="/osago" render={(routeProps) => (
                <PageLayout>
                    <Osago {...routeProps} showOffers={false}/>
                </PageLayout>
            )}/>
            <Route path="/osago_payment" render={(routeProps) => (
                <PageLayout>
                    <Osago {...routeProps} step={2} showOffers={'осаго'}/>
                </PageLayout>
            )}/>
            <Route path="/osago_done" render={(routeProps) => (
                <PageLayout>
                    <Osago {...routeProps} step={3} showOffers={'осаго'}/>
                </PageLayout>
            )}/>
            <Route path="/orders" render={(routeProps) => (
                <>
                    <Chat classList={['open']} title={'Уведомления'} total='123' data={[
                        {
                            date: 'Понедельник, 20.02.19',
                            count: '5',
                            msg: [
                                {
                                    author: 'Константинопольский М.',
                                    time: '9:50',
                                    bank: 'Русфинансбанк',
                                    statusColor: 'status_green',
                                    status: 'Договор прислан'
                                },
                                {
                                    author: 'Рябоконь С.Ю.',
                                    time: '9:50',
                                    bank: 'Московский Кредитбанк',
                                    statusColor: 'status_green',
                                    status: 'Одобрена'
                                },
                                {
                                    author: 'Салямин А.В.',
                                    time: '9:50',
                                    bank: 'Совкомбанк',
                                    statusColor: 'status_red',
                                    status: 'Отказ',
                                    info: 'По заявке принято отрицательное решение. Коваль Марина Руководитель по розничному бизнесу. Тел. +7 (916) 000 0000, Тел. +7 (495) 541 7845, доб. 108, mkoval@sovkom.ru Полное информирование будет направлено офисом клиенту'
                                },
                                {
                                    author: 'Рябоконь С.Ю.',
                                    time: '9:50',
                                    bank: 'Русфинансбанк',
                                    statusColor: 'status_blue',
                                    status: 'Запрос Банка',
                                    opacity: true
                                },
                                {
                                    author: 'Константинопольский М.',
                                    time: '9:50',
                                    bank: 'Русфинансбанк',
                                    statusColor: 'status_green',
                                    status: 'Договор прислан'
                                },
                                {
                                    author: 'Рябоконь С.Ю.',
                                    time: '9:50',
                                    bank: 'Московский Кредитбанк',
                                    statusColor: 'status_green',
                                    status: 'Одобрена'
                                },
                                {
                                    author: 'Салямин А.В.',
                                    time: '9:50',
                                    bank: 'Совкомбанк',
                                    statusColor: 'status_red',
                                    status: 'Отказ',
                                    opacity: true
                                },
                                {
                                    author: 'Рябоконь С.Ю.',
                                    time: '9:50',
                                    bank: 'Русфинансбанк',
                                    statusColor: 'status_blue',
                                    status: 'Запрос Банка'
                                }
                            ]
                        },
                        {
                            date: 'Понедельник, 20.02.19',
                            count: '1',
                            msg: [
                                {
                                    author: 'Салямин А.В.',
                                    time: '9:50',
                                    bank: 'Совкомбанк',
                                    statusColor: 'status_red',
                                    status: 'Отказ',
                                    info: 'По заявке принято отрицательное решение. Коваль Марина Руководитель по розничному бизнесу. Тел. +7 (916) 000 0000, Тел. +7 (495) 541 7845, доб. 108, mkoval@sovkom.ru Полное информирование будет направлено офисом клиенту'
                                }
                            ]
                        },
                        {
                            date: 'Четверг, 16.02.19',
                            msg: []
                        }
                    ]}/>
                    <PageLayout>
                        <Orders/>
                    </PageLayout>
                </>
            )}/>
            <Route path="/chery" render={(routeProps) => (
                <CheryLayout>
                    <Kasko {...routeProps} cabinet={true} step={1} showOffers={false}/>
                </CheryLayout>
            )}/>

      </BrowserRouter>
  )
}

export default App;
