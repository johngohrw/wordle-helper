export function Layout({ children }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-6xl w-full py-4">
        <div
          className="text-2xl sm:text-4xl flex text-center justify-center font-semibold text-gray-100 mb-6"
          style={{ letterSpacing: "4px" }}
        >
          WORDLE HELPER
        </div>
        {children}
      </div>
    </div>
  );
}
