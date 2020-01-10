import create from "zustand";


export const [useStore, api] = create((set, get) => {
    return {
        showStats: false,
        toggleStats: () => set(s => ({showStats: !s.showStats})),
        // count: 0,
        // increase: () => set(s=> ({ count: s.count + 1 })),
        // reset: () => set({ count: 0 })
    }
});

export const toggleStats = () => {
    api.setState({"showStats": !api.getState().showStats});
};

export default useStore;
