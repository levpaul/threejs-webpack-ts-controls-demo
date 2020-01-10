import create from "zustand";

const [useStore, api] = create((set, get) => {
    return {
        showStats: true,
        pointerLocker: false,
        canvas: null,
        //toggleStats:false () => set(s => ({showStats: !s.showStats})),
        // count: 0,
        // increase: () => set(s=> ({ count: s.count + 1 })),
        // reset: () => set({ count: 0 })
    }
});

export const toggleStats = () => {
    api.setState({"showStats": !api.getState().showStats});
};

export default useStore;
