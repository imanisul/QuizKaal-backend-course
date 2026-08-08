import React, { useState, useEffect } from 'react';

// Import all visualizers
import IntroVisualizer from './visualizers/IntroVisualizer';
import VariablesVisualizer from './visualizers/VariablesVisualizer';
import DataTypesVisualizer from './visualizers/DataTypesVisualizer';
import FunctionsVisualizer from './visualizers/FunctionsVisualizer';
import ScopeVisualizer from './visualizers/ScopeVisualizer';
import HoistingVisualizer from './visualizers/HoistingVisualizer';

import ArrayVisualizer from './visualizers/ArrayVisualizer';
import MapVisualizer from './visualizers/MapVisualizer';
import FilterVisualizer from './visualizers/FilterVisualizer';
import ReduceVisualizer from './visualizers/ReduceVisualizer';
import ObjectVisualizer from './visualizers/ObjectVisualizer';
import PrototypeVisualizer from './visualizers/PrototypeVisualizer';
import ThisKeywordVisualizer from './visualizers/ThisKeywordVisualizer';

import DOMTreeVisualizer from './visualizers/DOMTreeVisualizer';
import EventsVisualizer from './visualizers/EventsVisualizer';
import PromisesVisualizer from './visualizers/PromisesVisualizer';
import AsyncAwaitVisualizer from './visualizers/AsyncAwaitVisualizer';
import FetchVisualizer from './visualizers/FetchVisualizer';

// Advanced JS / Modern JS Visualizers
import EventLoopVisualizer from './visualizers/EventLoopVisualizer';
import ES6Visualizer from './visualizers/ES6Visualizer';
import ClassesVisualizer from './visualizers/ClassesVisualizer';
import ModulesVisualizer from './visualizers/ModulesVisualizer';

export default function AnimatedVisual({ topicId }) {
  switch (topicId) {
    case 'what-is-javascript':
      return <IntroVisualizer />;
    case 'variables':
      return <VariablesVisualizer />;
    case 'data-types':
      return <DataTypesVisualizer />;
    case 'functions':
      return <FunctionsVisualizer />;
    case 'scope':
      return <ScopeVisualizer />;
    case 'hoisting':
      return <HoistingVisualizer />;
      
    case 'arrays':
      return <ArrayVisualizer />;
    case 'map-method':
      return <MapVisualizer />;
    case 'filter-method':
      return <FilterVisualizer />;
    case 'reduce-method':
      return <ReduceVisualizer />;
    case 'objects':
      return <ObjectVisualizer />;
    case 'prototype':
      return <PrototypeVisualizer />;
    case 'this-keyword':
      return <ThisKeywordVisualizer />;
      
    case 'dom':
      return <DOMTreeVisualizer />;
    case 'events':
      return <EventsVisualizer />;
    case 'promises':
      return <PromisesVisualizer />;
    case 'async-await':
      return <AsyncAwaitVisualizer />;
    case 'fetch-api':
      return <FetchVisualizer />;
      
    case 'event-loop':
      return <EventLoopVisualizer />;
    case 'es6-features':
      return <ES6Visualizer />;
    case 'classes':
      return <ClassesVisualizer />;
    case 'modules':
      return <ModulesVisualizer />;
      
    default:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-textTertiary font-mono text-sm border-2 border-dashed border-white/5 rounded-xl p-8 min-h-[400px]">
          <span className="text-xl text-white mb-2">Animation for {topicId}</span>
          <span className="text-sm opacity-50">(Building visualization...)</span>
        </div>
      );
  }
}
