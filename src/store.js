import { create } from "zustand";
import { persist } from "zustand/middleware";

// Creating a custom hook called 'useStore' to manage application state
const useStore = create(
  // This function is used to create a new store instance.
  persist(
    // State initializer function defining the initial state of the store
    () => ({
      code: "",
      title: "Untitled",
      theme: "hyper",
      darkMode: true,
      showBackground: true,
      language: "plaintext",
      autoDetectLanguage: false,
      fontSize: 16,
      fontStyle: "jetBrainsMono",
      padding: 64,
    }),
    {
      name: "user-preferences", // Name of the store for persistence
    }
  )
);

export default useStore;
