import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, Clock, BookOpen, ExternalLink, MapPin } from 'lucide-react';
import { CoordinateTag } from './coordinate-tag';
import { SampleBadge } from './sample-badge';
import { Badge } from './badge';

// -------------------------------------------------------------
// 1. StoryCard (News & Features)
// -------------------------------------------------------------
export interface StoryCardProps {
  slug: string;
  title: string;
  dek?: string | null;
  coverUrl?: string | null;
  type?: 'NEWS' | 'FEATURE' | 'FIELD_NOTE' | 'INTERVIEW' | 'EXPLAINER';
  publishedAt?: string | null;
  readingMinutes?: number;
  authorName?: string;
  sourcePublisher?: string;
  isDemo?: boolean;
  featured?: boolean;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  slug,
  title,
  dek,
  coverUrl,
  type = 'NEWS',
  publishedAt,
  readingMinutes = 4,
  authorName,
  sourcePublisher,
  isDemo = false,
  featured = false,
}) => {
  return (
    <article className="group relative flex flex-col justify-between border-b border-rule pb-6 mb-6">
      <div>
        {coverUrl && (
          <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden rounded-md bg-sand-300/20 border border-rule">
            <Image
              src={coverUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge variant="sea">{type.replace('_', ' ')}</Badge>
          {isDemo && <SampleBadge compact />}
          {readingMinutes && (
            <span className="font-mono text-[11px] text-muted flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingMinutes} min read</span>
            </span>
          )}
        </div>

        <h3
          className={`font-serif font-semibold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors ${
            featured ? 'text-2xl md:text-3xl leading-tight' : 'text-lg md:text-xl'
          }`}
        >
          <Link href={`/news/${slug}`} className="focus:outline-none">
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        {dek && <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">{dek}</p>}
      </div>

      <div className="mt-4 pt-3 border-t border-rule/40 flex items-center justify-between text-xs font-mono text-muted">
        <div>
          {authorName ? <span>By {authorName}</span> : sourcePublisher ? <span>Source: {sourcePublisher}</span> : null}
        </div>
        {publishedAt && <span>{new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
      </div>
    </article>
  );
};

// -------------------------------------------------------------
// 2. PlaceCard (Explorer)
// -------------------------------------------------------------
export interface PlaceCardProps {
  slug: string;
  name: string;
  type: string;
  summary?: string | null;
  coverUrl?: string | null;
  lat: number;
  lng: number;
  protectionStatus?: string | null;
  isDemo?: boolean;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  slug,
  name,
  type,
  summary,
  coverUrl,
  lat,
  lng,
  protectionStatus,
  isDemo = false,
}) => {
  return (
    <article className="group relative flex flex-col justify-between border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 hover:border-sea-700/50 transition-all">
      <div>
        {coverUrl && (
          <div className="relative w-full aspect-[3/2] mb-3 overflow-hidden rounded-sm bg-sand-300/10 border border-rule/50">
            <Image
              src={coverUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant="sand">{type.replace('_', ' ')}</Badge>
          {isDemo && <SampleBadge compact />}
        </div>

        <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors">
          <Link href={`/explorer/places/${slug}`}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {name}
          </Link>
        </h3>

        {summary && <p className="mt-1 text-xs text-muted line-clamp-2 leading-relaxed">{summary}</p>}
      </div>

      <div className="mt-4 pt-2 border-t border-rule/40 flex items-center justify-between gap-2">
        <CoordinateTag lat={lat} lng={lng} />
        {protectionStatus && (
          <span className="text-[11px] font-mono text-sea-700 dark:text-sea-500">{protectionStatus}</span>
        )}
      </div>
    </article>
  );
};

// -------------------------------------------------------------
// 3. SpeciesCard (Taxonomy Guide)
// -------------------------------------------------------------
export interface SpeciesCardProps {
  slug: string;
  commonName: string;
  scientificName: string;
  group: string;
  iucnStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'DD' | 'NE';
  coverUrl?: string | null;
  isSensitive?: boolean;
  isDemo?: boolean;
}

export const SpeciesCard: React.FC<SpeciesCardProps> = ({
  slug,
  commonName,
  scientificName,
  group,
  iucnStatus,
  coverUrl,
  isSensitive = false,
  isDemo = false,
}) => {
  const iucnVariant = (`iucn-${iucnStatus.toLowerCase()}` as any) || 'neutral';

  return (
    <article className="group relative flex flex-col justify-between border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-4 hover:border-sea-700/50 transition-all">
      <div>
        {coverUrl && (
          <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-sm bg-sand-300/10 border border-rule/50">
            <Image
              src={coverUrl}
              alt={commonName}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={iucnVariant}>IUCN: {iucnStatus}</Badge>
          <div className="flex items-center gap-1">
            {isSensitive && (
              <span className="font-mono text-[10px] text-coral-600 bg-coral-500/10 px-1.5 py-0.5 rounded-sm">
                Sensitive
              </span>
            )}
            {isDemo && <SampleBadge compact />}
          </div>
        </div>

        <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors">
          <Link href={`/explorer/species/${slug}`}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {commonName}
          </Link>
        </h3>

        <p className="font-serif italic text-xs text-muted mt-0.5">{scientificName}</p>
      </div>

      <div className="mt-4 pt-2 border-t border-rule/40 flex items-center justify-between text-xs font-mono text-muted">
        <span>Group: {group}</span>
        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </article>
  );
};

// -------------------------------------------------------------
// 4. OpportunityCard (Grants, Fellowships, Jobs)
// -------------------------------------------------------------
export interface OpportunityCardProps {
  slug: string;
  title: string;
  kind: string;
  organizationName: string;
  deadlineAt?: string | null;
  amountText?: string | null;
  locationText?: string | null;
  isRemote?: boolean;
  isDemo?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  slug,
  title,
  kind,
  organizationName,
  deadlineAt,
  amountText,
  locationText,
  isRemote = false,
  isDemo = false,
}) => {
  const isClosingSoon =
    deadlineAt &&
    Math.ceil((new Date(deadlineAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 14;

  return (
    <article className="group relative border border-rule rounded-md bg-paper-card dark:bg-sea-900/20 p-5 hover:border-sea-700/50 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <Badge variant="sea">{kind}</Badge>
            {isRemote && <Badge variant="neutral">Remote</Badge>}
            {isDemo && <SampleBadge compact />}
          </div>
          {isClosingSoon && (
            <span className="font-mono text-[11px] font-semibold text-coral-600 bg-coral-500/10 px-2 py-0.5 rounded-sm">
              Closing soon
            </span>
          )}
        </div>

        <h3 className="font-serif text-lg font-semibold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors">
          <Link href={`/opportunities/${slug}`}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        <p className="mt-1 font-sans text-xs text-muted">{organizationName}</p>

        {amountText && (
          <p className="mt-2 font-mono text-xs font-medium text-ink dark:text-paper">{amountText}</p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-rule/40 flex items-center justify-between text-xs font-mono text-muted">
        <span>{locationText || (isRemote ? 'Global / Remote' : 'Red Sea')}</span>
        {deadlineAt && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Due {new Date(deadlineAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
          </span>
        )}
      </div>
    </article>
  );
};

// -------------------------------------------------------------
// 5. LibraryItemCard (Scientific Archive)
// -------------------------------------------------------------
export interface LibraryItemCardProps {
  slug: string;
  title: string;
  authorsText: string;
  type: string;
  year: number;
  doi?: string | null;
  isOpenAccess?: boolean;
  isDemo?: boolean;
}

export const LibraryItemCard: React.FC<LibraryItemCardProps> = ({
  slug,
  title,
  authorsText,
  type,
  year,
  doi,
  isOpenAccess = true,
  isDemo = false,
}) => {
  return (
    <article className="group relative border-b border-rule pb-4 mb-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <Badge variant="neutral">{type}</Badge>
          <span className="font-mono text-xs text-muted">{year}</span>
          {isOpenAccess && (
            <span className="font-mono text-[10px] text-[#2E7D32] bg-[#43A047]/10 px-1.5 py-0.5 rounded-sm border border-[#43A047]/20">
              Open Access
            </span>
          )}
          {isDemo && <SampleBadge compact />}
        </div>

        <h3 className="font-serif text-base font-semibold text-ink dark:text-paper group-hover:text-sea-700 dark:group-hover:text-sea-500 transition-colors">
          <Link href={`/library/${slug}`}>
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {title}
          </Link>
        </h3>

        <p className="font-sans text-xs text-muted mt-1">{authorsText}</p>
      </div>

      {doi && (
        <div className="mt-2 text-[11px] font-mono text-sea-700 dark:text-sea-500">
          DOI: {doi}
        </div>
      )}
    </article>
  );
};
