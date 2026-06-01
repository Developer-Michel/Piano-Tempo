import GroupPianoLessonsGatineauPage from "@/components/group-lessons/Gatineau";
import { Hero } from "@/components/hero/Hero";
import { Metadata } from "next";
type Props = {
  params: Promise<{ locale: string; city: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, locale } = await params;

  const titles: Record<string, Record<string, string>> = {
    gatineau: {
      fr: "Cours de piano en groupe à Gatineau | Piano à Tempo",
      en: "Piano lessons in group in Gatineau | Piano à Tempo",
    },
    ottawa: {
      fr: "Cours de piano en groupe pour Ottawa | Piano à Tempo",
      en: "Piano lessons in group for Ottawa | Piano à Tempo",
    },
  };
  return {
    title: titles[city][locale],
  };
}

export default async function Page({ params }: Props) {
  const { city } = await params;
  console.log("Page params:", { city });
  return (
    <main className="h-100">
      {(() => {
        switch (city) {
          case "gatineau":
            return <GroupPianoLessonsGatineauPage />;
          case "ottawa":
            return <div>Ottawa content</div>;
          default:
            return <div>Default content</div>;
        }
      })()}
    </main>
  );
}
