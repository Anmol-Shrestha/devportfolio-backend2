export type MDXContentProps = import('../types').MDXContentProps;
/**
 * @typedef {import('../types').MDXContentProps} MDXContentProps
 */
/**
 *
 * @param {string} code - The string of code you got from bundleMDX
 * @param {Record<string, unknown>} [globals] - Any variables your MDX needs to have accessible when it runs
 * @return {(props: MDXContentProps) => JSX.Element}
 */
export function getMDXComponent(code: string, globals?: Record<string, unknown> | undefined): (props: MDXContentProps) => JSX.Element;
export function getMDXExport(code: string, globals?: Record<string, unknown> | undefined): ReturnType<import("../types").MDXExport<ExportedObject, Frontmatter>>;
