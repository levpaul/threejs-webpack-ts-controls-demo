import create from "zustand";

interface AnimationHandler {

}

export const [useStore, api] = create((set, get) => {
    return {
        showStats: false,
        animationHandlers: Array<AnimationHandler>(),
    }
});

export const HUDActions = {
    toggleStats: () => {
        api.setState({showStats: !api.getState().showStats});
    }
};

export const AddAnimationHandler = function(handler) {
    api.getState().animationHandlers.push(handler)
};

export const GetAnimationHandlers = function () {
    return api.getState().animationHandlers
};

export default useStore;
