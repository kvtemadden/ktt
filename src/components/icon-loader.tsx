import { cn } from "@/lib/utils";

export const IconLoader = () => {
  return (
    <div className="origin-center-left relative flex h-40 w-40 items-center justify-center overflow-hidden">
      <Cloud style={{ top: "10%", animationDelay: "4s", opacity: 0 }} />
      <Cloud style={{ top: "60%" }} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        className="animate-float absolute top-8 z-10 h-36 w-80 stroke-current text-gray-800"
      >
        <g className="ease transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1">
          <g>
            <g>
              <polygon
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                className="stroke-[1.2px]"
                fill="none"
                points="89.52 29.13 117.42 23.23 97.5 33.38 89.52 29.13"
              />
              <polygon
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
                className="stroke-[1.2px]"
                fill="none"
                points="101.31 35.47 110.71 41.73 117.42 23.23 101.31 35.47"
              />
            </g>
            <polygon
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="stroke-[1.2px]"
              fill="none"
              points="99.14 41.73 104.59 38.15 101.31 35.47 99.14 41.73"
            />
            <line
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="stroke-[1.2px]"
              fill="none"
              x1="97.5"
              y1="33.38"
              x2="99.14"
              y2="41.73"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

interface CloudProps {
  className?: string;
  style?: React.CSSProperties;
}

const Cloud: React.FC<CloudProps> = ({ className, style }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#f1f1f1"
      height="45px"
      width="45px"
      viewBox="0 0 512.001 512.001"
      className={cn(
        "animate-moveCloud absolute z-0 -translate-y-1/2",
        className,
      )}
      style={{
        ...style,
        animationTimingFunction: "linear",
        animationDuration: "10s",
        animationIterationCount: "infinite",
      }}
    >
      <g>
        <g>
          <path d="M344.381,143.771C254.765,56.017,102.37,103.776,79.825,227.7c-31.849,4.598-59.138,25.445-72.018,55.076    c-0.016,0.035-0.032,0.07-0.047,0.107c-26.687,61.602,18.784,130.232,85.51,130.232h282.267    c75.246,0,136.463-61.216,136.463-136.462C512,189.241,430.314,123.682,344.381,143.771z M375.537,381.12H93.271    c-69.246,0-84.534-98.263-18.714-119.456c14.753-4.65,43.01-7.348,74.38,21.892c6.464,6.024,16.586,5.667,22.61-0.794    c6.024-6.464,5.668-16.586-0.794-22.61c-17.93-16.712-38.071-27.33-58.484-31.453c22.034-99.077,147.374-131.851,215.247-56.305    c4.189,4.661,10.714,6.451,16.693,4.57c67.272-21.117,135.795,29.374,135.795,99.69    C480.005,334.256,433.141,381.12,375.537,381.12z" />
        </g>
      </g>
    </svg>
  );
};
