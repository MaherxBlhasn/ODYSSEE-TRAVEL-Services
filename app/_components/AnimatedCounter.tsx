'use client';
import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
}

export default function AnimatedCounter({
    end,
    duration = 2000,
    suffix = '',
    prefix = ''
}: AnimatedCounterProps) {
    const [count, setCount] = useState<number>(0);
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [hasAnimated, setHasAnimated] = useState<boolean>(false);
    const counterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!isVisible || hasAnimated) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Multiple easing functions for ultra smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const combinedEasing = (easeOutCubic + easeOutQuart) / 2;

            const currentCount = Math.floor(end * combinedEasing);
            setCount(currentCount);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
                setHasAnimated(true);
            }
        };

        // Small delay for staggered effect
        const delay = Math.random() * 300;
        setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, delay);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isVisible, end, duration, hasAnimated]);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    };

    return (
        <div
            ref={counterRef}
            className={`text-5xl md:text-6xl font-bold mb-3 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
            style={{
                color: '#F28C28',
                textShadow: '0 2px 4px rgba(242, 140, 40, 0.2)',
                fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
        >
            {prefix}{formatNumber(count)}{suffix}
        </div>
    );
}