import {create} from "zustand";
import {persist} from "zustand/middleware";

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<CounterState>((set) => {
  return {
    count: 0,
    increment: () => set((state) => ({count: state.count + 1})),
    decrement: () => set((state) => ({count: state.count - 1})),
  }
});


export const useCounterStore2 = create<CounterState>()(persist(
  (set) => ({
    count: 0,
    increment: () => set((state) => ({count: state.count + 1})),
    decrement: () => set((state) => ({count: state.count - 1})),
  }),
  {
    name: "counter-storage", // Nom de la clé dans localStorage
  }
));
