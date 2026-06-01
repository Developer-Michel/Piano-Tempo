import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import PrivatePianoLessonsGatineau from "@/components/private-lessons/Gatineau";

type Props = {
  params: Promise<{ locale: string; city: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pianoLessonsPrivateGatineau.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function Page({ params }: Props) {
  const { city } = await params;

  if (city !== "gatineau") {
    return (
      <main className="min-h-screen pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-xl border border-gray-200 p-8 bg-white">
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-4">
            {city}
          </h1>
          <p className="font-sans text-gray-700 leading-relaxed">
            This private lessons page is currently available for Gatineau.
          </p>
        </div>
      </main>
    );
  }

  return <PrivatePianoLessonsGatineau />;
}
