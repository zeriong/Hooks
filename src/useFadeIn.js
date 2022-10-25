const useFadeIn = (duration = 1) => {
    if (typeof duration !== "number") {
        return;
    }
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.transition = `opacity ${duration}s`;
            current.style.opacity = 1;
        }
    }, []);
    return { ref: element, style: { opacity: 0 } };
};

const fadeInH1 = useFadeIn();
const fadeInP = useFadeIn(3);

return (
    <div className="App">
        <h1 {...fadeInH1}>hello</h1>
        <p {...fadeInP}>holly sheet</p>
    </div>
);