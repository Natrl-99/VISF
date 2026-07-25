import type { ReactNode } from "react";
import type { ClientUser } from "payload";
import { Button, Card, Gutter, Locked } from "@payloadcms/ui";
import { getTranslation } from "@payloadcms/translations";
import { formatAdminURL } from "payload/shared";
import { CollapsibleSection } from "./CollapsibleSection";

const CARD_GRID_CLASSES =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 list-none p-0 m-0";

type NavEntity = {
  slug: string;
  type: "collections" | "globals";
  label: string | Record<string, string>;
};

type NavGroup = {
  label: string | Record<string, string>;
  entities: NavEntity[];
};

type GlobalLockData = {
  slug: string;
  data: {
    _isLocked?: boolean;
    _userEditing?: ClientUser | null;
    _lastEditedAt?: string;
  };
  lockDuration?: number;
};

type DashboardProps = {
  navGroups: NavGroup[];
  globalData: GlobalLockData[];
  permissions: {
    collections?: Record<string, { create?: boolean }>;
  };
  payload: {
    config: { routes: { admin: string } };
  };
  user: { id: string } | null;
  i18n: Parameters<typeof getTranslation>[1];
};

// Splits labels like "Short Films - Introduction" into a "Short Films"
// sub-group with card title "Introduction". Entities without a " - " in
// their label render ungrouped, as before.
function splitLabel(rawLabel: string): { subGroup: string | null; title: string } {
  const separator = " - ";
  const index = rawLabel.indexOf(separator);
  if (index === -1) return { subGroup: null, title: rawLabel };
  return {
    subGroup: rawLabel.slice(0, index),
    title: rawLabel.slice(index + separator.length),
  };
}

// Payload's own `_isLocked` flag doesn't account for lock duration expiry
// (see getGlobalData.js in @payloadcms/ui) — recomputed here the same way
// Payload's default CollectionCards widget does it.
function isLockActive(lockInfo: GlobalLockData): boolean {
  if (!lockInfo.data._isLocked) return false;
  if (!lockInfo.lockDuration || !lockInfo.data._lastEditedAt) return true;

  const lastEditedAt = new Date(lockInfo.data._lastEditedAt).getTime();
  const lockExpiresAt = lastEditedAt + lockInfo.lockDuration * 1000;
  return Date.now() <= lockExpiresAt;
}

export function Dashboard({
  navGroups,
  globalData,
  permissions,
  payload,
  user,
  i18n,
}: DashboardProps) {
  const adminRoute = payload.config.routes.admin;
  const { t } = i18n;

  const renderCard = (entity: NavEntity, title: string, key: string) => {
    const isGlobal = entity.type === "globals";

    const href = formatAdminURL({
      adminRoute,
      path: isGlobal ? `/globals/${entity.slug}` : `/collections/${entity.slug}`,
    });

    let cardActions: ReactNode;

    if (isGlobal) {
      const lockInfo = globalData.find((g) => g.slug === entity.slug);
      const isLocked = lockInfo ? isLockActive(lockInfo) : false;
      const userEditing = lockInfo?.data._userEditing ?? null;

      if (isLocked && userEditing && user?.id !== userEditing.id) {
        cardActions = <Locked className="collections__locked" user={userEditing} />;
      }
    } else {
      const hasCreatePermission = permissions?.collections?.[entity.slug]?.create;
      if (hasCreatePermission) {
        cardActions = (
          <Button
            aria-label={t("general:createNewLabel", { label: title })}
            buttonStyle="icon-label"
            el="link"
            icon="plus"
            iconStyle="with-border"
            round
            to={formatAdminURL({
              adminRoute,
              path: `/collections/${entity.slug}/create`,
            })}
          />
        );
      }
    }

    return (
      <li key={key}>
        <Card
          actions={cardActions}
          buttonAriaLabel={
            isGlobal
              ? t("general:editLabel", { label: title })
              : t("general:showAllLabel", { label: title })
          }
          href={href}
          id={`card-${entity.slug}`}
          title={title}
          titleAs="h3"
        />
      </li>
    );
  };

  return (
    <Gutter className="dashboard flex flex-col gap-6">
      {navGroups.map((group) => {
        const groupLabel = getTranslation(group.label, i18n);
        const ungrouped: NavEntity[] = [];
        const subGroups = new Map<string, NavEntity[]>();

        for (const entity of group.entities) {
          const rawLabel = getTranslation(entity.label, i18n);
          const { subGroup } = splitLabel(rawLabel);
          if (!subGroup) {
            ungrouped.push(entity);
            continue;
          }
          const existing = subGroups.get(subGroup) ?? [];
          existing.push(entity);
          subGroups.set(subGroup, existing);
        }

        return (
          <CollapsibleSection title={groupLabel} storageKey={groupLabel} headingLevel="h2" key={groupLabel}>
            <div className="flex flex-col gap-4">
              {ungrouped.length > 0 && (
                <ul className={CARD_GRID_CLASSES}>
                  {ungrouped.map((entity) =>
                    renderCard(entity, getTranslation(entity.label, i18n), entity.slug),
                  )}
                </ul>
              )}

              {Array.from(subGroups.entries()).map(([subGroupLabel, entities]) => (
                <CollapsibleSection
                  title={subGroupLabel}
                  storageKey={`${groupLabel}:${subGroupLabel}`}
                  headingLevel="h3"
                  key={subGroupLabel}
                >
                  <ul className={CARD_GRID_CLASSES}>
                    {entities.map((entity) =>
                      renderCard(
                        entity,
                        splitLabel(getTranslation(entity.label, i18n)).title,
                        entity.slug,
                      ),
                    )}
                  </ul>
                </CollapsibleSection>
              ))}
            </div>
          </CollapsibleSection>
        );
      })}
    </Gutter>
  );
}
