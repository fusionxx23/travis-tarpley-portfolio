import type { JSX, ResolvedChildren } from "solid-js";

export default function LinkHoc({
  children,
}: {
  link: string | undefined;
  children: JSX.Element;
}) {
  return (
    <div
      class={`duration-300 delay-50  hover:-translate-y-2 bg-dark-0 rounded-md`}
    >
      {children}
    </div>
  );
}
