import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import styles from './Drop.module.scss'

gsap.registerPlugin(MorphSVGPlugin, ScrollTrigger)

const Drop = ({ colour }) => {

    const dropStep0Ref = useRef(null);
    const dropStep1Ref = useRef(null);
    const dropStep2Ref = useRef(null);
    const dropsWrapperRef = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        const animateDropsAndArrow = () => {
            const tl = gsap.timeline({ defaults: { duration: .75 } });

            // Morph the drops
            tl.to(dropStep0Ref.current, { morphSVG: dropStep1Ref.current, ease: "power4.in" })
              .to(arrowRef.current, { y: -40, ease: "back.inOut(1.7)" }, ">-=.6")
              .to(dropStep0Ref.current, { morphSVG: dropStep2Ref.current, ease: "back.out(2)" }, ">-=.5");

            return tl;
        };

        const trigger = ScrollTrigger.create({
            trigger: dropsWrapperRef.current,
            start: "top 90%",
            onEnter: () => {
                animateDropsAndArrow();
            },
        });

        return () => trigger.kill();
    }, []);

    return (
        <div className={styles.dropsWrapper} ref={dropsWrapperRef}>
            <svg className={styles.drops} width="263" height="110" viewBox="0 0 263 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path ref={dropStep0Ref} d="M0.153564 92.8737L54.4701 92.8736C54.4701 92.8736 73 92.8737 97.6388 92.8736C115 92.8734 130.207 92.8736 130.207 92.8736H131.263C131.263 92.8736 143 92.8735 163.831 92.8736C187.5 92.8737 207 92.8736 207 92.8736L263 92.8737V109.036H0.153564V92.8737Z" fill={colour} />
                <path ref={dropStep1Ref} d="M0 92.8736H55.1584C55.1584 92.8736 95.3593 76.4705 98.3271 31.5033C100.452 -0.73819 130.895 0.211488 130.895 0.211488H131.951C131.951 0.211488 162.394 -0.744125 164.519 31.5033C167.481 76.4705 207.688 92.8736 207.688 92.8736H262.846V109.036H0V92.8736Z" fill={colour} />
                <path ref={dropStep2Ref} d="M0 93.6651H55.1584C55.1584 93.6651 95.3593 97.262 98.3271 52.2948C100.452 20.0533 130.895 21.003 130.895 21.003H131.951C131.951 21.003 162.394 20.0474 164.519 52.2948C167.481 97.262 207.688 93.6651 207.688 93.6651H262.846V109.827H0V93.6651Z" fill={colour} />
            </svg>
            <svg ref={arrowRef} className={styles.arrow} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18.5696" cy="18.7947" r="18.5134" fill="#231F20"/>
                <path d="M10.6558 15.937L18.5697 23.6531L26.4837 15.937" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    )
}

export default Drop;