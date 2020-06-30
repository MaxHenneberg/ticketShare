"use strict";

import React from 'react';
import {TextField, SVGIcon} from 'react-md';

import { MovieListRow } from './MovieListRow';
import Page from './Page'


const dataTableStyle = {
    'marginBottom': '36px'
};

export const MovieList = ({bought}) => (
    {{bought} ?
            <div style = {{float: right}}>
                Already bought
            </div> :
            <div>
                Not bought
            </div>
    }
);