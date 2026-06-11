declare module "imagetracerjs" {
  export interface ImageTracerOptions {
    ltres?: number;
    qtres?: number;
    pathomit?: number;
    numberofcolors?: number;
    colorsampling?: number;
    strokewidth?: number;
    linefilter?: boolean;
    scale?: number;
    roundcoords?: number;
    viewbox?: boolean;
    blurradius?: number;
    rightangleenhance?: boolean;
  }

  export interface ImageTracer {
    imagedataToSVG(
      imagedata: ImageData,
      options?: ImageTracerOptions | string,
    ): string;
    imageToSVG(
      imageUrl: string,
      callback: (svgString: string) => void,
      options?: ImageTracerOptions | string,
    ): void;
  }

  const ImageTracer: ImageTracer;
  export default ImageTracer;
}
