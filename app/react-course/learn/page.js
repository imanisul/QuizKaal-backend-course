import Script from "next/script";
import ReactCourseClient from "../ReactCourseClient";

export const metadata = {
  title: "React Mastery Course | Learn | QuizKaal",
  description: "A complete, interactive React learning module. Master modern React from components to performance optimization, with live code editors and visualizations."
};

export default function ReactCourseLearnPage() {
  return (
    <>
      <ReactCourseClient />
    </>
  );
}
