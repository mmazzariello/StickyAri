import dynamic from "next/dynamic";

const DynamicHome = dynamic(() => import("src/Home"), { ssr: false });

export default function Index() {
  return <DynamicHome />;
}
