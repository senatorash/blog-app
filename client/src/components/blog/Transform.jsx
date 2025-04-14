// import SyntaxHighlighter from "react-syntax-highlighter";
// import hljs from "highlight.js";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export const transform = ({ language, code }) => {
//   detectedLanguage =
//     language || hljs.highlightAuto(code).language || "javascript";

//   return (
//     <SyntaxHighlighter
//       language={detectedLanguage}
//       style={dracula}
//       showLineNumbers
//       wrapLongLines
//       customStyle={{
//         borderRadius: "10px",
//         padding: "20px",
//         fontSize: "14px",
//         backgroundColor: "#1E1E1E",
//         lineHeight: "1.6",
//         border: "1px solid #444",
//       }}
//     >
//       {code}
//     </SyntaxHighlighter>
//   );
// };

// export const MarkdownRenderer = () => {
//   return (
//     <ReactMarkdown
//       children={content}
//       remarkPlugins={[remarkGfm]}
//       components={{
//         code({ inline, className, children, ...props }) {
//           const match = /language-(\w+)/.exec(className || "");
//           return !inline && match ? (
//             <codeBlock language={match[1]} code={String(children).trim()} />
//           ) : (
//             <code className={className} {...props}>
//               {children}
//             </code>
//           );
//         },
//       }}
//     />
//   );
// };
