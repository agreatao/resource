let easing = (x) => {
    if (x < 0.5) {
        return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
};

let animateScroll = (easing, options) => {
    options.progress = new Date().getTime() - options.start;
    options.percent = options.progress >= options.duration ? 1 : easing(options.progress / options.duration);
    options.currentPositionY = options.startPositionY + Math.ceil(options.deltaTop * options.percent);
    window.scrollTo(0, options.currentPositionY);
    if(options.percent < 1) {
        let easedAnimate = animateScroll.bind(null, easing, options);
        setTimeout(easedAnimate, 1000 / 60);
        return;
    }
};

let currentY = () => {
    return window.pageYOffset ? window.pageYOffset :
            ( document.compatMode && document.compatMode !== 'BackCompat' ?
                document.documentElement.scrollTop : document.body.scrollTop
            );
};

let scroll = (options) => {
    options = options || {
        currentPositionY: 0,
        startPositionY: 0,
        targetPositionY: 0,
        progress: 0,
        duration: 0,
        start: null,
        deltaTop: null,
        percent: null
    };
    options.startPositionY = currentY();
    options.deltaTop = Math.round(options.targetPositionY - options.startPositionY);
    options.duration = 0;
    options.start = new Date().getTime();

    options.duration = 1000;
    let easedAnimate = animateScroll.bind(null, easing, options);
    setTimeout(easedAnimate, 1000 / 60);
};

let onScroll = (callback) => {
    window.addEventListener('scroll', callback);
};

let removeScroll = (callback) => {
    window.removeEventListener('scroll', callback);
};

let getScrollbarWidth = () => {
    var scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    console.log(scrollbarWidth);
    return scrollbarWidth;
};

const hasScrollbar = () => {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
};

const scrollbarWidth = () => hasScrollbar() ? getScrollbarWidth() : 0;

module.exports = { scroll, onScroll, removeScroll, currentY, scrollbarWidth };
