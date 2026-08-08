import Script from "next/script";
import JavaScriptCourseClient from "./JavaScriptCourseClient";

export const metadata = {
  title: "JavaScript Mastery Course | QuizKaal",
  description: "Master JavaScript by visualizing the JS Engine. Deep dive into the Call Stack, Event Loop, Closures, Promises, and the DOM with live interactive animations."
};

export default function JavaScriptCoursePage() {
  return (
    <>
      <JavaScriptCourseClient />
    </>
  );
}
