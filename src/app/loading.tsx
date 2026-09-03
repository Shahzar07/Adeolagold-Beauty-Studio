export default function Loading() {
  return (
    <div className="container-page py-24" role="status" aria-label="Loading">
      <div className="skeleton h-3 w-24 rounded-subtle" />
      <div className="skeleton mt-8 h-12 w-2/3 max-w-xl rounded-subtle" />
      <div className="skeleton mt-4 h-4 w-1/2 max-w-md rounded-subtle" />
      <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-11 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="skeleton aspect-[4/5] rounded-subtle" />
            <div className="skeleton mt-4 h-3 w-3/4 rounded-subtle" />
            <div className="skeleton mt-2 h-3 w-1/2 rounded-subtle" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading content</span>
    </div>
  );
}
