import { cn } from "@/lib/utils";
import { codeSnippets, fonts } from "@/options";
import hljs from "highlight.js";
import Editor from "react-simple-code-editor";

export default function CodeEditor() {
  return (
    <div
      className={cn(
        "min-w-[400px] border-2 rounded-xl shadow-2xl",
        "bg-black/75 border-gray-600/40"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500"></div>
          <div className="rounded-full h-3 w-3 bg-yellow-500"></div>
          <div className="rounded-full h-3 w-3 bg-green-500"></div>
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value="Untitled"
            spellCheck={false}
            onClick={(e) => e.target.select()}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div className={cn("px-4 pb-4")}>
        <Editor
          value={codeSnippets[0].code}
          highlight={(code) =>
            hljs.highlight(code, { language: codeSnippets[0].language }).value
          }
          style={{
            fontStyle: "JetBrains Mono",
            fontSize: 18,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  );
}
