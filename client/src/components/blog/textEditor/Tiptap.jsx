import {
  EditorProvider,
  // FloatingMenu,
  // BubbleMenu,
  // EditorContent,
} from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { Color } from "@tiptap/extension-color";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import MenuBar from "./MenuBar";
const content = `<ul><li>dhfjgfjhdgsf</li>
<li>jshdfjksdfjkhsdjf</li></ul>`;

const Tiptap = () => {
  const extensions = [
    Document,
    Paragraph,
    Text,
    BulletList,
    ListItem,
    OrderedList,
  ];

  return (
    <div>
      <EditorProvider
        extensions={extensions}
        slotBefore={<MenuBar />}
        content={content}
      >
        {/* <FloatingMenu></FloatingMenu>
        <BubbleMenu></BubbleMenu> */}
      </EditorProvider>
    </div>
  );
};
export default Tiptap;
