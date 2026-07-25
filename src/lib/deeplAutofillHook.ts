import type { CollectionAfterChangeHook, Field } from "payload";
import { translateText } from "./deepl";

type DocValue = Record<string, unknown>;

async function buildLocalizedPatch(
  fields: Field[],
  enValue: DocValue | undefined | null,
  itValue: DocValue | undefined | null,
): Promise<{ patch: DocValue; changed: boolean }> {
  const patch: DocValue = {};
  let changed = false;

  for (const field of fields as Array<Field & { name?: string; fields?: Field[] }>) {
    if (!field.name) {
      if (field.fields) {
        const nested = await buildLocalizedPatch(field.fields, enValue, itValue);
        Object.assign(patch, nested.patch);
        changed = changed || nested.changed;
      }
      continue;
    }

    const name = field.name;
    const enFieldValue = enValue?.[name];

    if ((field.type === "text" || field.type === "textarea") && field.localized) {
      const itFieldValue = itValue?.[name];
      if (typeof enFieldValue === "string" && enFieldValue.trim() && !itFieldValue) {
        const translated = await translateText(enFieldValue);
        if (translated) {
          patch[name] = translated;
          changed = true;
        }
      } else if (itFieldValue !== undefined) {
        patch[name] = itFieldValue;
      }
      continue;
    }

    if (field.type === "array" && Array.isArray(enFieldValue) && field.fields) {
      const itArray = Array.isArray(itValue?.[name]) ? (itValue[name] as DocValue[]) : [];
      const rows: DocValue[] = [];
      for (let i = 0; i < enFieldValue.length; i++) {
        const enRow = enFieldValue[i] as DocValue;
        const nested = await buildLocalizedPatch(field.fields, enRow, itArray[i]);
        rows.push({ ...enRow, ...nested.patch });
        changed = changed || nested.changed;
      }
      patch[name] = rows;
      continue;
    }

    if (field.type === "group" && field.fields) {
      const enGroup = (enFieldValue as DocValue) ?? {};
      const nested = await buildLocalizedPatch(field.fields, enGroup, itValue?.[name] as DocValue);
      if (Object.keys(nested.patch).length) {
        patch[name] = { ...enGroup, ...nested.patch };
      }
      changed = changed || nested.changed;
    }
  }

  return { patch, changed };
}

// Fills empty Italian values from the just-saved English ones via DeepL, without
// ever overwriting Italian text an editor already entered — see FRONTEND i18n plan.
export function createDeepLAutofillHook(): CollectionAfterChangeHook {
  return async ({ doc, req, collection, operation, context }) => {
    if (context?.skipDeepLAutofill) return doc;
    if (req.locale !== "en") return doc;
    if (operation !== "create" && operation !== "update") return doc;
    if (!process.env.DEEPL_API_KEY) return doc;

    try {
      const itDoc = await req.payload.findByID({
        collection: collection.slug,
        id: doc.id,
        locale: "it",
        fallbackLocale: false,
        depth: 0,
        req,
      });

      const { patch, changed } = await buildLocalizedPatch(collection.fields, doc, itDoc as DocValue);

      if (changed) {
        await req.payload.update({
          collection: collection.slug,
          id: doc.id,
          locale: "it",
          data: patch,
          context: { skipDeepLAutofill: true },
          req,
        });
      }
    } catch (err) {
      req.payload.logger.error(`DeepL autofill failed for ${collection.slug}/${doc.id}: ${err}`);
    }

    return doc;
  };
}
