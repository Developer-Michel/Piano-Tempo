import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ResourceCard from "../../../components/resources/ResourceCard";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const { lang } = await params;

  const path = "resources";
  const isFrench = lang === "fr";
  return {
    title: isFrench
      ? "Ressources | Piano a Tempo"
      : "Resources | Piano a Tempo",
    description: isFrench
      ? "Découvrez nos ressources pour l'enseignement du piano à Gatineau et Ottawa."
      : "Explore our resources for piano teaching in Gatineau and Ottawa.",
    keywords: isFrench
      ? [
          "ressources cours de piano",
          "ressources d'enseignement piano",
          "piano Gatineau",
          "piano Ottawa",
        ]
      : [
          "piano lessons resources",
          "piano teaching resources",
          "piano Gatineau",
          "piano Ottawa",
        ],
    alternates: {
      canonical: `https://pianoatempo.ca/${lang}/${path}`,
      languages: {
        "en-CA": `https://pianoatempo.ca/en/${path}`,
        "fr-CA": `https://pianoatempo.ca/fr/${path}`,
        "x-default": `https://pianoatempo.ca/fr/${path}`,
      },
    },
    authors: [
      {
        name: "Michel Racicot-Nguyen",
      },
    ],
    publisher: "Michel Racicot-Nguyen",
    twitter: {
      card: "summary_large_image",
      title: isFrench
        ? "Piano a Tempo | Ressources"
        : "Piano a Tempo | Resources",
      images: ["https://pianoatempo.ca/concert.jpg"],
      description: isFrench
        ? "Découvrez nos ressources pour l'enseignement du piano à Gatineau et Ottawa."
        : "Explore our resources for piano teaching in Gatineau and Ottawa.",
    },
    openGraph: {
      title: isFrench
        ? "Piano a Tempo | Ressources"
        : "Piano a Tempo | Resources",
      description: isFrench
        ? "Découvrez nos ressources pour l'enseignement du piano à Gatineau et Ottawa."
        : "Explore our resources for piano teaching in Gatineau and Ottawa.",
      url: `https://pianoatempo.ca/${lang}/${path}`,
      alternateLocale: lang === "fr" ? ["en_CA"] : ["fr_CA"],
      locale: lang === "fr" ? "fr_CA" : "en_CA",
      siteName: "Piano a Tempo",
      type: "website",
      images: [
        { url: "https://pianoatempo.ca/concert.jpg", width: 800, height: 600 },
      ],
    },
  };
}

export default async function Resources({}: {}) {
  const t = await getTranslations("resources");
  const resourceCategories = t.raw("categories") as {
    title: string;
    description: string;
  }[];

  const comparisonColumns = [
    {
      name: "Yamaha P-45",
      url: "https://www.amazon.ca/Yamaha-88-Key-Contemporary-Digital-Piano/dp/B00UJ9LNDK/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.VdUgmj9F0lK7zGViBiLZ-8dCa2Z5QLnrPAE08xabQHmR41VMBCjfhgJAXSHA48TxvjTNH_C_Ww_iMPBQB6f6amQwwuG5u1MnTDH53F0qp-hIAkprdLil2oAjTcY4gZgMBzj8-LRjgadk_29c1zzfIOpHh0eABYcCd_lZrj4JkjuOLc8jYgDdz5DdWN9lHJu3Ho8yqGeo6ReQlTamtEMHIg_ncyTfDE-mjkC4bemBDl6KYCO-JtqnbSHQ1Wvu2MosIAXQ3nB1ZyJoZmE_-n-eC7BUttOpavBeIKCrBKAcOjg.bCHujHKBcVDnBnRvFCed_a1aVeBHEujMT84o8NNa4ig&dib_tag=se&gad_source=1&hvadid=605210603039&hvdev=c&hvexpln=0&hvlocphy=9000595&hvnetw=g&hvocijid=11648680918795073365--&hvqmt=e&hvrand=11648680918795073365&hvtargid=kwd-299366882150&hydadcr=12600_13449140&keywords=yamaha+p-45&mcid=bd181f09cc8b32ad8d7e24e27476bea1&qid=1777740400&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
    },
    {
      name: "Roland FP-30X",
      url: "https://www.bestbuy.ca/en-ca/product/roland-fp-30x-88-key-weighted-hammer-action-digital-piano-black/15311730?region_id=124418",
    },
    {
      name: "Yamaha CLP-785",
      url: "https://www.pianoheritage.com/shop/yamaha-pianos/digital-pianos/yamaha-clp-785-clavinova/?gad_source=1&gad_campaignid=226597852&gbraid=0AAAAADj2uexl0ymvVh8gNZHw73GLwOHbS&gclid=CjwKCAjwwdbPBhBgEiwAxBRA4UwURSQve29HSkSakUR1jrAOErqWoDelfV2PKOKblIFZXiVS2AxMjhoCNMIQAvD_BwE",
    },
    {
      name: "Yamaha B1",
      url: "https://geraldmusique.ca/en/products/yamaha-b1-pe-piano-droit-noir-lustre-polished-ebony?variant=47749163024576&country=CA&currency=CAD",
    },
    {
      name: "Yamaha U1",
      url: "https://pianovertu.com/product/yamaha-u1m-1983",
    },
    {
      name: "Steinway Model S",
      url: "https://www.vancouvermusicgallery.com/product/steinway-sons-grand-piano-model-s-fully-restored-used-baby-grand-piano",
    },
  ];

  const comparisonRows = [
    {
      label: "Type",
      values: [
        "Digital",
        "Digital",
        "Digital",
        "Acoustic",
        "Acoustic",
        "Acoustic",
      ],
    },
    {
      label: "Level",
      values: [
        "Beginner",
        "Intermediate",
        "Professional",
        "Beginner",
        "Professional",
        "Elite",
      ],
    },
    {
      label: "Key feel",
      values: [
        "Good",
        "Very good",
        "Excellent (wood)",
        "Real",
        "Real (high-end)",
        "Best possible",
      ],
    },
    {
      label: "Sound realism",
      values: [
        "Good",
        "Very good",
        "Near-acoustic",
        "Real",
        "Excellent",
        "Concert-level",
      ],
    },
    {
      label: "Maintenance",
      values: [
        "None",
        "None",
        "None",
        "Needs tuning",
        "Needs tuning",
        "Needs tuning",
      ],
    },
    {
      label: "Portability",
      values: ["High", "Medium", "Low", "None", "None", "None"],
    },
    {
      label: "Price range",
      values: ["$", "$$", "$$$$", "$$", "$$$", "$$$$$"],
    },
  ];

  const resourceImages = [
    "/new_piano.jpg",
    "/piano_used.webp",
    "/piano_acoustique.webp",
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="page-resources">
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1
              className="font-serif text-4xl md:text-5xl text-black mb-4"
              data-testid="text-resources-title"
            >
              {t("title")}
            </h1>
            <p
              className="font-serif text-xl text-gold  mb-4"
              data-testid="text-resources-subtitle"
            >
              {t("subtitle")}
            </p>
            <div className="w-24 h-1 bg-gold mx-auto" />
          </div>

          <div className="text-center mb-12">
            <p
              className="font-sans text-gray-600 max-w-2xl mx-auto"
              data-testid="text-resources-coming-soon"
            >
              {t("comingSoon")}
            </p>
          </div>

          <section
            className="space-y-6"
            aria-labelledby="resources-what-piano-to-buy"
          >
            <h2
              id="resources-what-piano-to-buy"
              className="font-serif font-bold text-2xl md:text-3xl text-black"
              data-testid="text-resources-section-what-piano-to-buy"
            >
              {t("whatPianoToBuySection")}
            </h2>

            <div className="space-y-6">
              {resourceCategories.map((resource, index) => {
                return (
                  <div key={index} className="transition-all duration-300">
                    <ResourceCard
                      title={resource.title}
                      description={resource.description}
                      index={index}
                      iconIndex={index}
                      imageSrc={resourceImages[index] ?? "/yamaha_piano.avif"}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section
            className="mt-16 space-y-6"
            aria-labelledby="resources-piano-comparison"
          >
            <div className="space-y-2">
              <h2
                id="resources-piano-comparison"
                className="font-serif font-bold text-2xl md:text-3xl text-black"
                data-testid="text-resources-section-piano-comparison"
              >
                Piano Comparison Table
              </h2>
              <p
                className="font-sans text-gray-600"
                data-testid="text-resources-section-piano-comparison-subtitle"
              >
                A quick side-by-side overview to help you choose the right
                instrument.
              </p>
            </div>

            <div className="rounded-2xl border border-gold/30 shadow-sm bg-gradient-to-b from-amber-50/40 to-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-black text-white">
                      <th className="text-left px-4 py-3 font-serif font-semibold text-sm uppercase tracking-wide border-b border-white/10">
                        Category
                      </th>
                      {comparisonColumns.map((model) => (
                        <th
                          key={model.name}
                          className="text-left px-4 py-3 font-serif font-semibold text-sm border-b border-white/10"
                        >
                          <a
                            href={model.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
                          >
                            {model.name}
                          </a>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, rowIndex) => (
                      <tr
                        key={row.label}
                        className={
                          rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50/80"
                        }
                      >
                        <th className="text-left px-4 py-3 font-sans font-semibold text-black border-b border-gray-200 whitespace-nowrap">
                          {row.label}
                        </th>
                        {row.values.map((value, valueIndex) => (
                          <td
                            key={`${row.label}-${valueIndex}`}
                            className="px-4 py-3 font-sans text-gray-700 border-b border-gray-200"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
