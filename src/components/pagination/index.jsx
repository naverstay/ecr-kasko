import React from 'react';
import cn from 'classnames';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export default function Pagination(props) {
    const classContainer = cn([
        'pagination__container',
        ...props.classList
    ]);

    const pages = props.pages.map(page => (
        <li
            onClick={() => {
                props.onPageChange(page);
            }}
            className={cn([
                'pagination__page',
                '_circle',
                {active: props.activePage === page}
            ])}
            key={page}
        >
            {page}
        </li>
    ));

    return (
        <div className={classContainer}>
            <button
                className={'pagination__first-page pagination__page' + (props.start ? ' _text' : ' _circle')}
                onClick={() => {
                    props.onPageChange(props.firstPage);
                }}
            >
                {props.start ?
                    <>{props.start}</>
                    :
                    <>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </>
                }
            </button>

            <button
                className='pagination__prev-page pagination__page'
                onClick={() => {
                    const prevPageNum =
                        props.activePage - 1 > 0 ? props.activePage - 1 : props.firstPage;
                    props.onPageChange(prevPageNum);
                }}
            >
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <ul className='pagination__pages'>{pages}</ul>
            <button
                className='pagination__next-page pagination__page'
                onClick={() => {
                    const nextPageNum =
                        props.activePage + 1 < props.lastPage
                            ? props.activePage + 1
                            : props.lastPage;
                    props.onPageChange(nextPageNum);
                }}
            >
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>

            <button
                className={'pagination__last-page pagination__page' + (props.end ? ' _text' : ' _circle')}
                onClick={() => {
                    props.onPageChange(props.lastPage);
                }}
            >
                {props.end ?
                    <>{props.end}</>
                    :
                    <>
                        <FontAwesomeIcon icon={faChevronRight}/>
                        <FontAwesomeIcon icon={faChevronRight}/>
                    </>
                }
            </button>
        </div>
    );
}
