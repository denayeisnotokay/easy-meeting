import {Scene} from "react-scrollmagic-r18";
import {cloneElement} from "react";

const transitionProgress = (p, t) => Math.min(0.5 / t - 1 / t * Math.abs(p - 0.5), 1)

export default function Scrollerr({transition = 0.1, children}) {
    return <Scene
        triggerHook={1}
        duration="95%"
    >
        {(progress) => cloneElement(children, {style: {
                opacity: transitionProgress(progress, transition),
                scale: 0.8 + 0.2 * (transitionProgress(progress, transition)),
                //translate:`0 ${calculateTranslate()}%`,
                //WebkitMaskImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.0) ${64 - offset}px, rgba(255, 255, 255, 1.0) ${96 - offset}px)`,
                //maskImage: `linear-gradient(180deg, rgba(255, 255, 255, 0.0) ${64 - offset}px, rgba(255, 255, 255, 1.0) ${96 - offset}px)`
        }})}
    </Scene>
}