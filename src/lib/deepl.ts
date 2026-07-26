const DEEPL_FREE_API_URL = "https://api-free.deepl.com/v2/translate";
const DEEPL_PRO_API_URL = "https://api.deepl.com/v2/translate";

type DeepLResponse = {
  translations?: { text?: string }[];
};

// DeepL free-tier keys are suffixed ":fx" and must hit the free API host, not the pro one.
export async function translateText(text: string): Promise<string | null> {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey || !text.trim()) return null;

  const url = apiKey.endsWith(":fx") ? DEEPL_FREE_API_URL : DEEPL_PRO_API_URL;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: [text],
      source_lang: "EN",
      target_lang: "IT",
    }),
  });

  if (!response.ok) return null;

  const json = (await response.json()) as DeepLResponse;
  return json.translations?.[0]?.text ?? null;
}
