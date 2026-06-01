import { NextResponse } from "next/server";

type GooglePlaceReview = {
  authorAttribution?: {
    displayName?: string;
    uri: string;
    photoUri?: string;
  };
  name?: string;
  relativePublishTimeDescription?: string;
  rating?: number;
  text?: {
    text?: string;
    languageCode?: string;
  };
};

type PlaceDetailsNewResponse = {
  reviews?: GooglePlaceReview[];
  userRatingCount?: number;
  rating?: number;
};

export async function GET(request: Request) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json({
      configured: false,
      reviews: [],
    });
  }

  const url = new URL(request.url);
  const lang = url.searchParams.get("lang")?.toLowerCase();

  const placesUrl = `https://places.googleapis.com/v1/places/${placeId}`;

  try {
    const response = await fetch(placesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "rating,userRatingCount,reviews.rating,reviews.relativePublishTimeDescription,reviews.text,reviews.originalText,reviews.authorAttribution",
      },
      next: { revalidate: 60 * 60 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          configured: true,
          reviews: [],
          error: `Failed to fetch Google reviews: ${errorText}`,
        },
        { status: 502 },
      );
    }

    const data = (await response.json()) as PlaceDetailsNewResponse;

    const allReviews = data.reviews ?? [];
    return NextResponse.json(
      {
        configured: true,
        rating: data.rating,
        ratingCount: data.userRatingCount ?? 0,
        reviews: allReviews.filter(
          (x) => x.text != null && x.rating && x.rating > 4,
        ),
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    console.error("Google reviews fetch error:", error);
    return NextResponse.json(
      {
        configured: true,
        reviews: [],
        error: "Unexpected error while fetching reviews",
      },
      { status: 500 },
    );
  }
}
