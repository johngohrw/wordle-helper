import { HelpButton } from "./HelpButton";

export function Layout({ children }) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="max-w-6xl w-full py-4">
        <div
          className="relative border-b border-white text-2xl sm:text-4xl flex text-center justify-center font-semibold text-gray-100 mb-6 pb-3 sm:pb-4"
          style={{ letterSpacing: "4px" }}
        >
          <div className="absolute left-3 top-0">
            {/* <HelpButton className="h-8 sm:h-10" /> */}
          </div>
          <div>WORDLE HELPER</div>
        </div>
        {children}
      </div>
    </div>
  );
}
