import * as React from "react"
import Svg, { Defs, Path, Circle } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="Capa_1"
    data-name="Capa 1"
    viewBox="0 0 1200 1200"
    {...props}
  >
    <Defs></Defs>
    <Path
      d="M405.11 836.61c-2.29 9.32-10.38 15.5-19.92 15.5-12.35 0-20.77-9.85-20.77-20.5 0-10.06 7.77-20.39 20.66-20.39s18.96 9.53 20.02 15.71h-10.54c-1.12-2.93-4.1-6.87-9.53-6.87-6.76 0-10.54 5.91-10.54 11.5 0 5.96 4.05 11.71 10.6 11.71s8.84-5.27 9.48-6.66h10.54ZM409.95 832.08c0-12.89 9.9-20.87 20.77-20.87 12.14 0 20.82 9.48 20.82 20.45s-8.63 20.45-20.87 20.45-20.71-9.85-20.71-19.97v-.05Zm10.06-.48c0 6.02 4.1 11.66 10.86 11.66 7.14 0 10.6-6.5 10.6-11.56s-3.46-11.66-10.7-11.66-10.76 5.96-10.76 11.5v.05ZM458.29 811.95h21.51v8.84h-11.45v6.71h11.02v8.84h-11.02v15.02h-10.06v-39.4ZM486.56 811.95h21.51v8.84h-11.45v6.71h11.02v8.84h-11.02v15.02h-10.06v-39.4ZM514.83 811.95h22.31v8.84h-12.25v6.12h11.87v8.84h-11.87v6.76h12.25v8.84h-22.31v-39.4ZM544.27 811.95h22.31v8.84h-12.25v6.12h11.87v8.84h-11.87v6.76h12.25v8.84h-22.31v-39.4ZM626.53 828.19l-6.39 11.98 5.96 6.07-6.02 5.91-4.79-4.95c-1.01 1.76-4.21 4.95-10.6 4.95-8.78 0-14.16-5.06-14.16-11.45 0-5.86 4.47-8.89 7.29-10.81-2.77-2.82-3.73-5.7-3.73-8.52 0-5.75 4.85-10.17 10.92-10.17s10.33 4.37 10.33 9.69-3.73 7.83-5.43 9.05l4.37 4.42 2.93-6.18h9.32Zm-23.27 7.03c-1.28 1.01-3.03 2.39-3.03 4.58 0 2.5 2.13 3.89 4.74 3.89s3.83-1.17 4.53-2.18l-6.23-6.28Zm1.76-16.88c-1.12 0-2.34.85-2.34 2.61 0 1.86 1.33 3.3 2.24 4.26 1.17-1.17 2.45-2.45 2.45-4.37 0-1.38-.8-2.5-2.29-2.5h-.05ZM650.96 811.95h12.89c6.18 0 10.01 1.12 12.19 2.82 3.3 2.56 4.79 6.44 4.79 10.75 0 3.03-.85 5.38-1.97 7.14-1.33 2.08-3.25 3.41-5.11 4.21l8.15 14.48h-10.38l-10.28-19.01h1.65c2.56 0 4.74-.21 6.07-1.06 1.23-.8 2.24-2.66 2.24-4.85s-1.01-3.73-2.34-4.58c-1.12-.69-2.72-1.06-4.1-1.06h-3.73v30.56h-10.06v-39.4ZM687.05 811.95h22.31v8.84h-12.25v6.12h11.87v8.84h-11.87v6.76h12.25v8.84h-22.31v-39.4ZM724.27 838.31c0 4.58 2.82 5.38 4.1 5.38 2.4 0 3.84-1.97 3.84-3.78 0-2.08-1.65-2.72-7.72-5.27-2.77-1.12-9.64-3.89-9.64-11.29 0-7.93 7.19-12.14 13.79-12.14 5.43 0 13.1 2.77 13.26 12.25h-9.96c-.21-1.33-.53-3.83-3.62-3.83-1.76 0-3.46 1.22-3.46 3.09s1.06 2.29 8.15 5.49c7.35 3.3 9.21 6.71 9.21 11.29 0 6.28-3.3 12.62-13.74 12.62s-14.48-6.07-14.22-13.79h10.01ZM753.07 820.79h-7.77v-8.84h25.56v8.84h-7.72v30.56h-10.07v-30.56ZM772.93 832.08c0-12.89 9.9-20.87 20.77-20.87 12.14 0 20.82 9.48 20.82 20.45s-8.63 20.45-20.87 20.45-20.71-9.85-20.71-19.97v-.05Zm10.06-.48c0 6.02 4.1 11.66 10.87 11.66 7.13 0 10.6-6.5 10.6-11.56s-3.46-11.66-10.7-11.66S783 826 783 831.54v.05Z"
      className="cls-2"
      style={{
        fill: "#139faa",
        strokeWidth: 0,
      }}
    />
    <Path
      d="M339.38 701.51c-4.08-1.68-7.59-3.02-10.54-4-2.95-.98-5.59-1.79-7.9-2.42-2.32-.63-4.36-1.05-6.11-1.26-1.76-.21-3.48-.32-5.16-.32-8.01 0-14.47 2.7-19.39 8.12-4.92 5.41-7.38 12.54-7.38 21.39s2.49 15.81 7.48 20.87c4.99 5.06 11.77 7.59 20.34 7.59 3.65 0 7.69-.56 12.12-1.68 4.42-1.13 10.5-3.16 18.23-6.11l10.96 22.13c-3.66 1.69-7.41 3.16-11.28 4.42-3.87 1.27-7.66 2.35-11.38 3.27-3.73.91-7.24 1.58-10.54 2-3.3.42-6.22.63-8.75.63-8.15 0-15.63-1.3-22.45-3.9-6.82-2.6-12.64-6.22-17.49-10.86-4.85-4.63-8.64-10.18-11.38-16.65-2.74-6.46-4.11-13.56-4.11-21.29 0-8.15 1.37-15.6 4.11-22.34s6.53-12.54 11.38-17.39c4.85-4.85 10.64-8.61 17.39-11.28 6.74-2.66 14.05-4 21.92-4 4.91 0 11.06 1.02 18.44 3.06 7.38 2.04 14.72 4.67 22.02 7.9l-10.54 22.13ZM439.92 771.49c-3.8 1.4-8.33 2.56-13.59 3.48-5.27.91-10.36 1.37-15.28 1.37s-9.84-.74-15.17-2.21c-5.34-1.48-10.29-3.93-14.86-7.38-4.57-3.44-8.36-7.9-11.38-13.38-3.02-5.48-4.53-12.22-4.53-20.23v-61.96h27.61v61.75c0 3.09.56 5.8 1.69 8.11 1.13 2.32 2.6 4.22 4.43 5.69 1.82 1.48 3.9 2.6 6.22 3.37 2.32.78 4.6 1.16 6.85 1.16 4.5 0 8.22-.24 11.17-.74 2.95-.49 5.69-1.51 8.22-3.05v-76.29h27.82v113.18l-19.18-12.86ZM563 701.51c-4.08-1.68-7.59-3.02-10.54-4-2.95-.98-5.59-1.79-7.9-2.42-2.32-.63-4.36-1.05-6.11-1.26-1.76-.21-3.48-.32-5.16-.32-8.01 0-14.47 2.7-19.39 8.12-4.92 5.41-7.38 12.54-7.38 21.39s2.49 15.81 7.48 20.87c4.99 5.06 11.77 7.59 20.34 7.59 3.65 0 7.69-.56 12.12-1.68 4.43-1.13 10.5-3.16 18.23-6.11l10.96 22.13c-3.65 1.69-7.41 3.16-11.28 4.42-3.87 1.27-7.66 2.35-11.38 3.27-3.73.91-7.24 1.58-10.54 2-3.31.42-6.22.63-8.75.63-8.15 0-15.63-1.3-22.45-3.9-6.82-2.6-12.64-6.22-17.49-10.86-4.85-4.63-8.64-10.18-11.38-16.65-2.74-6.46-4.11-13.56-4.11-21.29 0-8.15 1.37-15.6 4.11-22.34s6.53-12.54 11.38-17.39c4.85-4.85 10.64-8.61 17.39-11.28 6.74-2.66 14.05-4 21.92-4 4.92 0 11.06 1.02 18.44 3.06 7.38 2.04 14.72 4.67 22.02 7.9l-10.54 22.13ZM636.97 719.64l48.69 39.62-18.13 18.13-48.69-40.26v36.89h-27.4V627.75l27.4-7.38v81.57l42.79-36.25 15.6 20.44-40.26 33.51ZM798.42 744.09c-2.81 6.61-6.64 12.3-11.49 17.07-4.85 4.77-10.64 8.53-17.39 11.28-6.74 2.74-13.98 4.11-21.71 4.11s-14.89-1.37-21.5-4.11c-6.61-2.74-12.37-6.5-17.28-11.28-4.92-4.78-8.78-10.46-11.59-17.07-2.81-6.6-4.21-13.7-4.21-21.29s1.4-14.86 4.21-21.39c2.81-6.53 6.67-12.22 11.59-17.07 4.91-4.85 10.68-8.64 17.28-11.39 6.6-2.74 13.77-4.11 21.5-4.11s14.96 1.37 21.71 4.11 12.54 6.54 17.39 11.39c4.85 4.85 8.67 10.54 11.49 17.07 2.81 6.53 4.21 13.67 4.21 21.39s-1.4 14.69-4.21 21.29Zm-26.24-32.98c-1.34-3.59-3.2-6.67-5.59-9.27a27.87 27.87 0 0 0-8.32-6.22c-3.16-1.54-6.64-2.32-10.43-2.32s-7.1.74-10.33 2.21a25.294 25.294 0 0 0-8.43 6.22c-2.39 2.67-4.25 5.79-5.59 9.38-1.34 3.58-2 7.48-2 11.69s.67 8.12 2 11.7 3.19 6.64 5.59 9.17c2.38 2.53 5.2 4.53 8.43 6.01 3.23 1.48 6.67 2.21 10.33 2.21s7.27-.73 10.43-2.21c3.16-1.47 5.93-3.48 8.32-6.01 2.39-2.53 4.25-5.59 5.59-9.17 1.34-3.58 2-7.48 2-11.7s-.67-8.11-2-11.69ZM921.29 744.09c-2.81 6.61-6.64 12.3-11.49 17.07-4.85 4.77-10.64 8.53-17.39 11.28-6.74 2.74-13.98 4.11-21.71 4.11s-14.89-1.37-21.5-4.11c-6.61-2.74-12.37-6.5-17.28-11.28-4.92-4.78-8.78-10.46-11.59-17.07-2.81-6.6-4.22-13.7-4.22-21.29s1.4-14.86 4.22-21.39c2.81-6.53 6.67-12.22 11.59-17.07 4.91-4.85 10.67-8.64 17.28-11.39 6.61-2.74 13.77-4.11 21.5-4.11s14.96 1.37 21.71 4.11 12.54 6.54 17.39 11.39c4.85 4.85 8.67 10.54 11.49 17.07 2.81 6.53 4.21 13.67 4.21 21.39s-1.4 14.69-4.21 21.29Zm-26.24-32.98c-1.34-3.59-3.2-6.67-5.59-9.27a27.87 27.87 0 0 0-8.32-6.22c-3.16-1.54-6.64-2.32-10.43-2.32s-7.1.74-10.33 2.21a25.194 25.194 0 0 0-8.43 6.22c-2.39 2.67-4.25 5.79-5.58 9.38-1.34 3.58-2 7.48-2 11.69s.66 8.12 2 11.7c1.33 3.58 3.19 6.64 5.58 9.17 2.39 2.53 5.2 4.53 8.43 6.01 3.23 1.48 6.67 2.21 10.33 2.21s7.27-.73 10.43-2.21c3.16-1.47 5.93-3.48 8.32-6.01 2.39-2.53 4.25-5.59 5.59-9.17 1.34-3.58 2-7.48 2-11.7s-.67-8.11-2-11.69ZM940.73 674.42c1.44.83 2.57 1.98 3.39 3.44.82 1.46 1.22 3.1 1.22 4.92s-.41 3.47-1.22 4.95a8.88 8.88 0 0 1-3.39 3.46c-1.44.83-3.08 1.25-4.9 1.25s-3.5-.42-4.95-1.25a8.811 8.811 0 0 1-3.39-3.46c-.82-1.48-1.23-3.13-1.23-4.95s.41-3.46 1.23-4.92a8.963 8.963 0 0 1 3.39-3.44c1.44-.83 3.09-1.25 4.95-1.25s3.45.42 4.9 1.25Zm.59 13.97c1.4-1.44 2.1-3.31 2.1-5.61s-.7-4.16-2.1-5.61c-1.4-1.44-3.23-2.17-5.49-2.17s-4.12.72-5.49 2.17c-1.37 1.44-2.05 3.31-2.05 5.61s.68 4.16 2.05 5.61c1.37 1.44 3.2 2.17 5.49 2.17s4.09-.72 5.49-2.17Zm-1.84-5.68c-.39.52-.93.89-1.63 1.11l2.64 3.91-2.97.05-2.26-3.77h-.8v3.77h-2.45v-10.13h4.52c1.07 0 1.92.28 2.57.85.64.57.97 1.34.97 2.31 0 .75-.2 1.39-.59 1.91Zm-5.02-.73h1.93c.35 0 .64-.09.87-.28.24-.19.35-.45.35-.8s-.12-.6-.35-.78-.53-.26-.87-.26h-1.93v2.12Z"
      className="cls-1"
    />
    <Circle
      cx={590.08}
      cy={464.88}
      r={117.04}
      className="cls-2"
      transform="rotate(-45 590.08 464.88)"
      style={{
        fill: "#139faa",
        strokeWidth: 0,
      }}
    />
    <Path
      d="M438.77 357.88s80.68 31.03 87.97 33.58c0 0 68.93 29.47 106.72-7.39 0 0 16.87-20.43 20.17-23.24 0 0 22.45-23.28 51.17-2.95 0 0 34.3-10.16 36.59-8.38 0 0-29.15 15.79-39.23 33.69 0 0-8.09 13.24-9.97 28.02 0 0-12.8 71.44-74.29 80.08 0 0 .24 11.02.87 15.23l2.94 18.31s23.63 2.03 30.49 22.1l-3.05 2.29s-4.29-2.61-8.07-6.66c0 0-4.89-7.06-12.51-8.58 0 0 10.92 18.04 9.15 27.45l-5.34.76s-5.34-24.14-17.53-30.49c0 0-1.71-1.36-12.55 4.91 0 0-5.5 3.22-7.27-1.1 0 0-.18-3.86 4.73-5.75 0 0 15.25-4.79 15.09-5.69-.17-.89.16.9.16.9s-3.05-22.71-3.46-24.83l-2.04-8.08s-10.16.26-26.68-2.29c0 0-.51 46.5 1.52 53.36 0 0 22.37 1.52 30.5 22.11l-4.58 2.29s-13.21-15.25-19.82-16.01c0 0 11.18 18.81 9.91 28.2l-5.33.76s-6.64-26.8-17.53-30.49c0 0-4.24-.35-12.29 4.65 0 0-4.99 2.97-8.29-.08 0 0 1.41-5.68 8.55-7.88l12.03-4.32s-2.8-40.9-1.52-55.65c0 0-31.26-7.87-42.69-54.12 0 0-71.9-37.08-80.8-42.81 0 0-11.44-9.03-13.73-31.89Z"
      className="cls-1"
    />
  </Svg>
)
export default SvgComponent