import { useRef } from "react";
import CodeEditor from "./components/CodeEditor";
import { themes, fonts } from "./options";
import { cn } from "./lib/utils";
import useStore from "./store";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import ExportOptions from "./components/controls/ExportOptions";

function App() {
  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  const editorRef = useRef(null);

  return (
    <main className="dark min-h-screen flex justify-center items-center bg-neutral-950 text-white">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />
      <div
        className={cn(
          "overflow-hidden mb-2 transition-all ease-out",
          showBackground ? themes[theme].background : "ring ring-neutral-900"
        )}
        style={{ padding }}
        ref={editorRef}
      >
        <CodeEditor />
      </div>

      <Card className="fixed bottom-16 py-16 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <ExportOptions targetRef={editorRef} />
      </Card>
    </main>
  );
}

export default App;
