function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function Tabs({ tabs, value, onClick, className, ...rest }) {
  return (
    <div
      className={`w-full border-b border-gray-200 flex justify-center ${className}`}
      aria-label="Tabs"
      {...rest}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.value}
          onClick={() => onClick(tab)}
          style={{}}
          className={classNames(
            tab.value === value
              ? "text-indigo-700 bg-gray-200"
              : "text-gray-200",
            " mx-1 text-sm sm:text-lg font-semibold px-4 py-2 rounded-t-lg border border-b-0"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
