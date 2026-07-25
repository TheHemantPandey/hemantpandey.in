import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
};

const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? undefined));

const cx = (...parts) => parts.filter(Boolean).join(' ');

const useResizeObserver = (callback, elements, dependencies) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (seqRef, onLoad, dependencies) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach(img => {
      const htmlImg = img;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach(img => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useAnimationLoop = (trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover) => {
  const rafRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (seqWidth > 0) {
      offsetRef.current = ((offsetRef.current % seqWidth) + seqWidth) % seqWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }

    if (prefersReduced) {
      track.style.transform = 'translate3d(0, 0, 0)';
      return () => {
        lastTimestampRef.current = null;
      };
    }

    const animate = timestamp => {
      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

export const LogoLoop = memo(({
  logos,
  speed = 120,
  direction = 'left',
  width = '100%',
  gap = 32,
  pauseOnHover = true,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = 'Partner logos',
  className,
  style
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const directionMultiplier = direction === 'left' ? 1 : -1;
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap]);

  useImageLoader(seqRef, updateDimensions, [logos, gap]);

  useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover);

  const cssVariables = useMemo(() => ({
    '--logoloop-gap': `${gap}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
  }), [gap, fadeOutColor]);

  const rootClasses = useMemo(() =>
    cx(
      'relative overflow-x-hidden group py-6',
      '[--logoloop-gap:32px]',
      '[--logoloop-fadeColorAuto:var(--bg-primary)]',
      className
    ), [className]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsHovered(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsHovered(false);
  }, [pauseOnHover]);

  const renderLogoItem = useCallback((item, key) => {
    const isNodeItem = 'node' in item;
    const displayName = item.alt || item.title || "";

    const content = isNodeItem ? (
      /* 🚀 ENHANCED PADDING AND INTERACTION STATES FOR LARGER CAPSULES */
      <div
        className={cx(
          'inline-flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md shadow-lg transition-all duration-300',
          'hover:border-orange-500/50 hover:bg-orange-500/[0.03] hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]',
          'motion-reduce:transition-none',
          scaleOnHover && 'group-hover/item:-translate-y-1.5'
        )}
        aria-hidden={!!item.href && !item.ariaLabel}>
        <div className="flex items-center justify-center min-w-[32px]">
          {item.node}
        </div>
        {/* 🚀 HIGHER TEXT SIZE TO text-lg */}
        {displayName && <span className="text-lg font-semibold tracking-wide text-[var(--text-primary)] select-none">{displayName}</span>}
      </div>
    ) : (
      <div
        className={cx(
          'inline-flex items-center gap-4 px-8 py-4 rounded-full border border-[var(--border)] bg-[var(--surface)] backdrop-blur-md shadow-lg transition-all duration-300',
          'hover:border-orange-500/50 hover:bg-orange-500/[0.03] hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]',
          'motion-reduce:transition-none',
          scaleOnHover && 'group-hover/item:-translate-y-1.5'
        )}>
        {/* 🚀 FOR EXPANDED IMAGE FALLBACKS */}
        <img
          className="h-8 w-auto block object-contain [-webkit-user-drag:none] pointer-events-none"
          src={item.src}
          srcSet={item.srcSet}
          sizes={item.sizes}
          width={item.width}
          height={item.height}
          alt={item.alt ?? ''}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false} />
          {displayName && <span className="text-lg font-semibold tracking-wide text-[var(--text-primary)] select-none">{displayName}</span>}
      </div>
    );

    const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

    const inner = item.href ? (
      <a
        className="inline-flex items-center no-underline rounded-full focus-visible:outline focus-visible:outline-orange-500 focus-visible:outline-offset-2"
        href={item.href}
        aria-label={itemAriaLabel || 'logo link'}
        target="_blank"
        rel="noreferrer noopener">
        {content}
      </a>
    ) : (
      content
    );

    return (
      <li
        className={cx(
          'flex-none mr-[var(--logoloop-gap)] flex items-center py-2',
          scaleOnHover && 'overflow-visible group/item'
        )}
        key={key}
        role="listitem">
        {inner}
      </li>
    );
  }, [scaleOnHover]);

  const logoLists = useMemo(() =>
    Array.from({ length: copyCount }, (_, copyIndex) => (
      <ul
        className="flex items-center"
        key={`copy-${copyIndex}`}
        role="list"
        aria-hidden={copyIndex > 0}
        ref={copyIndex === 0 ? seqRef : undefined}>
        {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
      </ul>
    )), [copyCount, logos, renderLogoItem]);

  const containerStyle = useMemo(() => ({
    width: toCssLength(width) ?? '100%',
    ...cssVariables,
    ...style
  }), [width, cssVariables, style]);

  return (
    <div
      ref={containerRef}
      className={rootClasses}
      style={containerStyle}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {fadeOut && (
        <>
          <div
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-y-0 left-0 z-[1]',
              'w-[clamp(40px,12%,160px)]',
              'bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
            )} />
          <div
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-y-0 right-0 z-[1]',
              'w-[clamp(40px,12%,160px)]',
              'bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--logoloop-fadeColorAuto))_0%,rgba(0,0,0,0)_100%)]'
            )} />
        </>
      )}
      <div
        className="flex w-max will-change-transform select-none items-center motion-reduce:transform-none"
        ref={trackRef}>
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;