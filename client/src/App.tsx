import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteComponentProps
} from 'react-router-dom';
import { BrainStormCanvas } from './features/brainstorm/BrainStormCanvas';

function App() {
  return (
    <BrainStormCanvas/>
  );
}