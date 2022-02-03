export function NoWords({ ...rest }) {
  return (
    <div
      className="flex flex-col h-52 justify-center items-center text-gray-400 text-xl font-semibold"
      {...rest}
    >
      <div className="mb-4">No words found :(</div>
      <div>Please try another combination</div>
    </div>
  );
}
