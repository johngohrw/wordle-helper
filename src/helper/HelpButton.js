import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsQuestionCircle, BsX } from "react-icons/bs";
import { allStates } from "./WordInput";

export function HelpButton({ className, ...rest }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="h-8 sm:h-10">
        <BsQuestionCircle />
      </button>
      <Modal open={open} setOpen={setOpen}>
        <div className="xs:px-4 mb-6">
          <div className="mb-4">
            <Dialog.Title
              as="h3"
              className="text-lg leading-6 font-semibold text-gray-100"
            >
              How does it work?
            </Dialog.Title>
          </div>
          <div className="mb-8">
            <p className="text-sm text-gray-100">
              This tool takes all valid 5-letter words and rule them out based
              on the constraints that you've set. There are 3 different
              filtering rules that you can make use of:
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold" style={{ color: "#c1c1c1" }}>
              Remove Letter
            </h4>
          </div>
          <div className="mb-7 flex">
            <div className="flex-shrink-0 mr-3">
              <Square size={48} color={allStates[0].color} text="E" />
            </div>
            <p className="text-sm text-gray-100 self-center">
              Gray letters will <b>never</b> be included in any of the words in
              your results.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold" style={{ color: "#52d75d" }}>
              Correct Letter
            </h4>
          </div>
          <div className="mb-8 flex">
            <div className="flex-shrink-0 mr-3">
              <Square size={48} color={allStates[2].color} text="R" />
            </div>
            <p className="text-sm text-gray-100">
              Green letters <b>must</b> appear in whatever position it is in.
              E.g. a green{" "}
              <span
                className="font-semibold px-2 py-0.5"
                style={{ backgroundColor: allStates[2].color }}
              >
                R
              </span>{" "}
              in the fourth position will mean that we will rule out all words
              that do not have an{" "}
              <span className="font-semibold px-1 py-0.5" style={{}}>
                R
              </span>{" "}
              as it's fourth letter.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold" style={{ color: "#f7d63f" }}>
              Letter in Word
            </h4>
          </div>
          <div className="mb-8 flex">
            <div className="flex-shrink-0 mr-3">
              <Square size={48} color={allStates[1].color} text="H" />
            </div>
            <p className="text-sm text-gray-100">
              Yellow letters indicate that it's present in the word, but not at
              it's position. E.g. if there's a yellow{" "}
              <span
                className="font-semibold px-2 py-0.5"
                style={{ backgroundColor: allStates[1].color }}
              >
                H
              </span>{" "}
              in the second position, the tool will rule out <b>both</b> words
              without{" "}
              <span className="font-semibold px-1 py-0.5" style={{}}>
                H
              </span>{" "}
              and words with{" "}
              <span className="font-semibold px-1 py-0.5" style={{}}>
                H
              </span>{" "}
              in the second position.
            </p>
          </div>
          <div className="mb-4 text-gray-500 font-semibold text-sm">
            Additionally..
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold">Wildcards</h4>
          </div>
          <div className="mb-8">
            <div className="flex space-x-1 mb-4">
              <Square size={48} color={allStates[0].color} text="_" />
              <Square size={48} color={allStates[0].color} text="_" />
              <Square size={48} color={allStates[0].color} text="_" />
              <Square size={48} color={allStates[2].color} text="A" />
              <Square size={48} color={allStates[0].color} text="" />
            </div>
            <p className="text-sm text-gray-100 self-center">
              You can type in spaces or underscores to leave empty spaces. These
              empty squares will act as a wildcard (
              <span className="font-semibold px-1 py-0.5" style={{}}>
                *
              </span>
              ) and won't be taken into consideration for the word search.
            </p>
          </div>
        </div>
        <div className="px-4">
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}

function Square({ text, color, size }) {
  return (
    <span
      className="flex items-center justify-center text-3xl font-semibold"
      style={{
        height: `${size}px`,
        width: `${size}px`,
        backgroundColor: color,
      }}
    >
      {text}
    </span>
  );
}

function Modal({ children, open, setOpen }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pb-20 text-center p-3">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden align-middle h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="relative inline-block align-middle bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-white text-left overflow-hidden shadow-xl transform transition-all max-w-xl w-full">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3"
              >
                <BsX className="w-8 h-8" />
              </button>
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
