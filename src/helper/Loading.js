export function Loading({ ...rest }) {
  return (
    <div
      className="flex flex-col h-24 justify-center items-center text-gray-400 text-xl font-semibold"
      {...rest}
    >
      <div className="mb-4">Loading..</div>
    </div>
  );
}
