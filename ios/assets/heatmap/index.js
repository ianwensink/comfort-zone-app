import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import HeatMap from './heatmap';

window.addEventListener('error', (err) => alert(err.message), true);

document.addEventListener('DOMContentLoaded', () => render(<HeatMap/>, document.getElementById('app')));
