import{ useRef, useEffect, useState } from "react";

export const useOutside = () => {
    const ref = useRef(null);
    const [isSelect, setIsSelect] = useState(false);

    const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setIsSelect(false);
                // alert("You clicked outside of me!");
            }
        }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [ref]);

    return { isSelect, setIsSelect, ref }
}

/**
 * Component that alerts if you click outside of it
 */
// export default function Outside(props) {
//     const wrapperRef = useRef(null);
//     useOutside(wrapperRef);

//     return <div ref={wrapperRef}>{props.children}</div>;
// }