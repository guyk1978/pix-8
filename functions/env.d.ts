interface Element {
  setAttribute(name: string, value: string): void;
}

type PagesFunction = (context: {
  request: Request;
  next: () => Promise<Response>;
}) => Promise<Response>;

declare const HTMLRewriter: new () => {
  on(
    selector: string,
    handler: { element(element: Element): void },
  ): HTMLRewriter;
  transform(response: Response): Response;
};
