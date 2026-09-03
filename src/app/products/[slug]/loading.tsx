export default function Loading() {
  return (
    <div className="container-page py-10" role="status" aria-label="Loading product">
      <div className="skeleton h-3 w-40 rounded-subtle" />
      <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        <div className="lg:col-span-7">
          <div className="skeleton aspect-[4/5] rounded-subtle" />
        </div>
        <div className="lg:col-span-5">
          <div className="skeleton h-3 w-20 rounded-subtle" />
          <div className="skeleton mt-5 h-10 w-4/5 rounded-subtle" />
          <div className="skeleton mt-3 h-3 w-1/3 rounded-subtle" />
          <div className="skeleton mt-8 h-7 w-28 rounded-subtle" />
          <div className="skeleton mt-8 h-16 w-full rounded-subtle" />
          <div className="skeleton mt-6 h-11 w-full rounded-subtle" />
          <div className="skeleton mt-3 h-[52px] w-full rounded-subtle" />
        </div>
      </div>
      <span className="sr-only">Loading product</span>
    </div>
  );
}
