declare module "onnxruntime-web" {
  export type {
    InferenceSession,
    Tensor,
  } from "onnxruntime-web/types";
}

declare module "onnxruntime-web/wasm" {
  import type { InferenceSession, Tensor } from "onnxruntime-web/types";

  export const env: {
    wasm: {
      wasmPaths: string;
      numThreads: number;
    };
    logLevel: string;
  };

  export class Tensor {
    constructor(type: string, data: Tensor.DataType, dims: readonly number[]);
    readonly data: Tensor.DataType;
  }

  export namespace Tensor {
    type DataType = Float32Array;
  }

  export namespace InferenceSession {
    interface SessionOptions {
      executionProviders?: string[];
      graphOptimizationLevel?: string;
    }
  }

  export class InferenceSession {
    static create(
      model: ArrayBuffer,
      options?: InferenceSession.SessionOptions,
    ): Promise<InferenceSession>;
    readonly inputNames: string[];
    readonly outputNames: string[];
    run(
      feeds: Record<string, Tensor>,
    ): Promise<Record<string, Tensor>>;
  }
}
