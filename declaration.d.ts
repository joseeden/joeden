declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "@theme/IdealImage" {
  import type { ComponentProps, ReactNode } from "react";

  export type IdealImageSource =
    | string
    | { default: string }
    | {
        preSrc: string;
        src: {
          height?: number;
          width?: number;
          preSrc: string;
          src: string;
          images: Array<{
            width: number;
            path?: string;
            size?: number;
            format?: "webp" | "jpeg" | "png" | "gif";
          }>;
        };
      };

  export interface Props extends ComponentProps<"img"> {
    readonly img: IdealImageSource;
  }

  export default function IdealImage(props: Props): ReactNode;
}

declare module "*.jpg";
declare module "*.png";
declare module "*.svg" {
  import type { FunctionComponent, SVGProps } from "react";

  const content: string;
  export default content;
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
}
declare module "*.md";
