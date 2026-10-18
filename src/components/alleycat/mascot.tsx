import { useEffect, useRef } from "react";

export function AlleyMascot() {
  const eyes = useRef<SVGGElement>(null);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(pointer: fine)");
    if (motion.matches || !desktop.matches) return;
    const follow = (event: PointerEvent) => {
      if (!eyes.current) return;
      const box = eyes.current.getBoundingClientRect();
      const x = Math.max(-6, Math.min(6, (event.clientX - box.x - box.width / 2) / 80));
      const y = Math.max(-4, Math.min(4, (event.clientY - box.y - box.height / 2) / 80));
      eyes.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, []);
  return (
    <svg className="alley-cat" viewBox="0 0 500 540" role="img" aria-label="Street-smart alley cat with neon cyan eyes and a pink bandana">
      <g className="cat-tilt">
        <ellipse className="cat-shadow" cx="265" cy="507" rx="165" ry="15" />
        <path className="cat-outline" d="M343 389Q481 331 454 241Q438 212 418 237Q404 256 428 282Q439 335 346 345Z" />
        <path className="cat-fur" d="M343 389Q481 331 454 241Q438 212 418 237Q404 256 428 282Q439 335 346 345Z" />
        <path className="cat-outline" d="M158 278Q136 316 134 365L113 486Q113 506 173 499L207 483Q251 503 301 483L329 499Q383 507 388 487L352 350Q345 302 321 277Z" />
        <path className="cat-fur" d="M158 278Q136 316 134 365L113 486Q113 506 173 499L207 483Q251 503 301 483L329 499Q383 507 388 487L352 350Q345 302 321 277Z" />
        <path className="cat-light" d="M188 337Q232 355 285 329L296 453Q255 472 207 452Z" />
        <path className="cat-lines" d="M171 371L158 475M329 366L350 476M132 486L136 474M151 489L153 476M355 488L353 476M372 489L368 476" />
        <path className="cat-outline" d="M128 199L111 70Q109 43 131 60L205 116Q251 97 302 117L371 58Q393 38 388 69L376 207Q399 262 357 292Q259 344 161 299Q112 279 128 199Z" />
        <path className="cat-fur" d="M128 199L111 70Q109 43 131 60L205 116Q251 97 302 117L371 58Q393 38 388 69L376 207Q399 262 357 292Q259 344 161 299Q112 279 128 199Z" />
        <path className="cat-ear" d="M132 83L148 169L184 132ZM364 83L316 134L358 165Z" />
        <path className="cat-light" d="M168 139L211 118L230 170L250 125L274 170L298 120L335 143L300 158L280 184L219 187L197 162Z" />
        <path className="cat-cheek" d="M127 213L107 224L128 238L112 251L135 260M377 211L398 224L378 238L393 253L370 262" />
        <path className="cat-eyes" d="M153 194Q178 180 218 204L207 229Q172 232 153 211ZM286 204Q322 181 349 194L348 213Q326 232 295 229Z" />
        <g ref={eyes} className="cat-pupils"><path d="M189 195L194 224L201 199ZM306 199L311 224L316 193Z" /></g>
        <path className="cat-brow" d="M151 179L217 192M284 192L350 176" />
        <path className="cat-light" d="M211 248Q231 233 251 243Q269 231 290 247Q292 277 252 285Q209 277 211 248Z" />
        <path className="cat-nose" d="M241 246L265 246L253 257Z" />
        <path className="cat-lines" d="M253 257L253 269L239 275M253 269L269 272M182 251L107 237M180 265L101 266M317 251L398 235M319 265L407 264" />
        <path className="cat-scar" d="M334 251L348 268M341 247L355 264" />
        <path className="cat-bandana" d="M153 293Q251 335 354 289L348 325L282 365L242 322Q190 322 153 309ZM342 318L379 337L365 365L328 326Z" />
        <path className="cat-bandana-line" d="M248 322L282 348L299 329M351 328L365 344" />
        <path className="cat-tag" d="M262 322L274 333L262 344L250 333Z" />
      </g>
    </svg>
  );
}

export function AlleyBackdrop() {
  return <div className="alley-backdrop" aria-hidden="true">
    <div className="brick-wall" />
    <svg className="alley-silhouettes" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice">
      <path className="building-silhouette" d="M0 20H185V700H0ZM1210 0H1400V700H1210Z" />
      <g className="escape-lines"><path d="M12 120H216V174H12M12 280H216V334H12M12 440H216V494H12M23 128V169M50 128V169M77 128V169M104 128V169M131 128V169M158 128V169M185 128V169M23 289V329M50 289V329M77 289V329M104 289V329M131 289V329M158 289V329M185 289V329M23 449V489M50 449V489M77 449V489M104 449V489M131 449V489M158 449V489M185 449V489M201 177L64 278M201 337L64 438M201 497L64 598" /></g>
      <path className="lamp-post" d="M1124 700V136Q1124 82 1070 82H1041V92H1070Q1114 92 1114 136V700ZM1019 93L1031 65H1060L1074 93Z" />
      <path className="lamp-bulb" d="M1023 95H1070L1061 103H1032Z" />
      <path className="ground-line" d="M0 645H1400M800 645L750 700M1030 645L1100 700" />
    </svg>
    <div className="lamp-light" />
  </div>;
}
