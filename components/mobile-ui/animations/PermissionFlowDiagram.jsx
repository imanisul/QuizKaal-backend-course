'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Camera, MapPin, CheckCircle, XCircle, Settings } from 'lucide-react';

export function PermissionFlowDiagram() {
  const [step, setStep] = useState('idle'); // idle, request, prompt, granted, denied, settings
  const [permission, setPermission] = useState('camera');

  const permissions = {
    camera: { icon: Camera, label: 'Camera', color: 'blue' },
    location: { icon: MapPin, label: 'Location', color: 'green' },
  };

  const resetFlow = () => setStep('idle');

  const requestPermission = (type) => {
    setPermission(type);
    setStep('request');
    setTimeout(() => setStep('prompt'), 800);
  };

  const grantPermission = () => {
    setStep('granted');
  };

  const denyPermission = () => {
    setStep('denied');
    setTimeout(() => setStep('settings'), 1500);
  };

  const PermIcon = permissions[permission].icon;

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Permission Request Flow
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => requestPermission('camera')}
            disabled={step !== 'idle'}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Camera
          </button>
          <button 
            onClick={() => requestPermission('location')}
            disabled={step !== 'idle'}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" /> Location
          </button>
        </div>
      </div>

      <div className="relative min-h-[280px] bg-neutral-900/50 rounded-xl border border-neutral-800 flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {step === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Shield className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400 text-sm">Click a permission button to see the OS flow</p>
            </motion.div>
          )}

          {step === 'request' && (
            <motion.div
              key="request"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-neutral-700 border-t-blue-400 rounded-full mx-auto mb-4"
              />
              <p className="text-blue-400 font-mono text-sm">Checking permission status...</p>
              <p className="text-neutral-500 text-xs mt-1">OS: Permission not yet granted</p>
            </motion.div>
          )}

          {step === 'prompt' && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-700 flex items-center justify-center mx-auto mb-3">
                  <PermIcon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1">Allow "{permissions[permission].label}"?</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  "MyApp" would like to access your {permission}. This will only be used while the app is active.
                </p>
              </div>
              <div className="space-y-2">
                <button 
                  onClick={grantPermission}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
                >
                  Allow
                </button>
                <button 
                  onClick={denyPermission}
                  className="w-full py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded-xl transition-colors"
                >
                  Don't Allow
                </button>
              </div>
            </motion.div>
          )}

          {step === 'granted' && (
            <motion.div
              key="granted"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              </motion.div>
              <h4 className="text-green-400 font-bold text-lg mb-1">Permission Granted!</h4>
              <p className="text-neutral-400 text-sm mb-4">The app can now access {permission}.</p>
              <button onClick={resetFlow} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors">
                Reset
              </button>
            </motion.div>
          )}

          {step === 'denied' && (
            <motion.div
              key="denied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h4 className="text-red-400 font-bold text-lg mb-1">Permission Denied</h4>
              <p className="text-neutral-400 text-sm">OS will NOT show the prompt again...</p>
            </motion.div>
          )}

          {step === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Settings className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h4 className="text-yellow-400 font-bold text-lg mb-1">Redirect to Settings</h4>
              <p className="text-neutral-400 text-sm mb-1">
                The OS will <strong className="text-white">never</strong> show the permission prompt again.
              </p>
              <p className="text-neutral-500 text-xs mb-4">
                Your app must direct the user to Settings → App → Permissions to re-enable.
              </p>
              <button onClick={resetFlow} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-sm rounded-lg transition-colors">
                Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
