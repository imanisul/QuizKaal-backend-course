// Sandbox Web Worker for executing user code securely
// This worker does not have DOM access by default.

// Mock localStorage and other potentially dangerous APIs to prevent access
const secureContext = {
  localStorage: null,
  sessionStorage: null,
  indexedDB: null,
  fetch: null,
  XMLHttpRequest: null,
  WebSocket: null,
  document: null,
  window: null,
};

self.onmessage = function (e) {
  const { code } = e.data;
  
  let logs = [];
  
  // Override console methods
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;

  const interceptLog = (...args) => {
    // Format arguments as strings
    const strArgs = args.map(arg => {
      if (typeof arg === 'object') {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return String(arg);
        }
      }
      return String(arg);
    });
    logs.push(strArgs.join(' '));
  };

  console.log = interceptLog;
  console.error = (...args) => {
    logs.push("Error: " + args.join(' '));
  };
  console.warn = interceptLog;
  console.info = interceptLog;

  let evalResult = null;
  let executionError = null;

  try {
    // We bind secureContext to mask global variables in the function scope
    // We pass variables as arguments
    const argNames = Object.keys(secureContext);
    const argValues = Object.values(secureContext);
    
    // Create a strict mode function that takes the masked globals as arguments
    const executor = new Function(...argNames, `"use strict";\n${code}`);
    
    // Execute the user's code
    evalResult = executor(...argValues);
  } catch (err) {
    executionError = err.toString();
    logs.push(`Error: ${err.message}`);
  } finally {
    // Restore original console
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
  }

  // Send results back to main thread
  self.postMessage({
    logs: logs,
    evalResult: typeof evalResult === 'object' ? null : evalResult, // Avoid cloning issues
    error: executionError
  });
};
