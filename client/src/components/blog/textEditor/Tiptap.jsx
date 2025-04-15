import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import MenuBar from "./MenuBar";
const content = `
<p>Paragraph 1</p>`;

const Tiptap = () => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  return (
    <div>
      <EditorProvider
        extensions={extensions}
        slotBefore={<MenuBar />}
        content={content}
        editorProps={{
          attributes: {
            spellcheck: "false",
          },
        }}
      >
        {/* <FloatingMenu> This is the floating Menu</FloatingMenu>
        <BubbleMenu>This is the Bubble Menu</BubbleMenu> */}
      </EditorProvider>
    </div>
  );
};
export default Tiptap;
