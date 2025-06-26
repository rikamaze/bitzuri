"use client";

import { useCallback, useEffect, useRef } from "react";

type KeyHandler = (event: KeyboardEvent) => void;

interface KeyMap {
  [key: string]: KeyHandler;
}

export function useKeyboardNavigation(keyMap: KeyMap, isActive: boolean = true) {
  const keyMapRef = useRef<KeyMap>(keyMap);

  // Update the ref when keyMap changes
  useEffect(() => {
    keyMapRef.current = keyMap;
  }, [keyMap]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const handler = keyMapRef.current[event.key];
    if (handler) {
      handler(event);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, handleKeyDown]);
}