import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>CyberGuard AI Logo</title>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
      <path d="M12 13v-1" />
      <path d="M12 17v-2" />
      <path d="m15.5 14.5-1-1" />
      <path d="m8.5 14.5 1-1" />
      <path d="m15.5 8.5-1 1" />
      <path d="m8.5 8.5 1 1" />
    </svg>
  );
}
