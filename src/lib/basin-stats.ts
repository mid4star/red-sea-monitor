import { SEED_COUNTRIES } from './seed-data';

export interface BasinStatItem {
  stat_key: string;
  value: string;
  unit: string;
  label: string;
  subtext: string;
  source_name: string;
  source_url: string;
  as_of: string;
  is_sample: boolean;
}

export function getLittoralCountries() {
  return SEED_COUNTRIES.filter((c: any) => c.is_littoral && c.is_published);
}

export function getPartnerCountries() {
  return SEED_COUNTRIES.filter((c: any) => !c.is_littoral && c.status === 'COMING_SOON');
}

export function getBasinStats() {
  const littoral = getLittoralCountries();
  const partners = getPartnerCountries();
  return {
    littoral_states: littoral.length,
    partner_states: partners.length,
    marine_subbasins: 6,
    open_access: 100,
  };
}

export function getBasinTelemetry(): BasinStatItem[] {
  const littoralCount = getLittoralCountries().length;
  const partnerCount = getPartnerCountries().length;

  return [
    {
      stat_key: 'coastline_monitored',
      value: '6,450+',
      unit: 'km',
      label: 'Littoral Coastline',
      subtext: 'From Suez & Aqaba to Bab-el-Mandeb',
      source_name: 'PERSGA Regional Strategy / IHO Special Publication 23',
      source_url: 'https://persga.org/regional-strategy',
      as_of: 'October 2026',
      is_sample: false,
    },
    {
      stat_key: 'active_mpas',
      value: '28+',
      unit: 'MPAs',
      label: 'Marine Protected Areas',
      subtext: 'UNESCO World Heritage, biosphere & national parks',
      source_name: 'UNEP-WCMC World Database on Protected Areas (WDPA)',
      source_url: 'https://www.protectedplanet.net/en/thematic-areas/marine-protected-areas',
      as_of: 'October 2026',
      is_sample: false,
    },
    {
      stat_key: 'coral_diversity',
      value: '350+',
      unit: 'Species',
      label: 'Hard Coral Taxa',
      subtext: 'Thermo-tolerant scleractinian diversity',
      source_name: 'Veron et al. (Corals of the World) & Fine et al. (PNAS)',
      source_url: 'https://doi.org/10.1073/pnas.1303839110',
      as_of: '2026',
      is_sample: false,
    },
    {
      stat_key: 'basin_littoral_states',
      value: `${littoralCount} Active`,
      unit: 'States',
      label: 'Littoral Basin Members',
      subtext: `+ ${partnerCount} Gulf of Aden partner in baseline surveys`,
      source_name: 'UN Cartographic Section & International Hydrographic Organization',
      source_url: 'https://www.un.org/geospatial',
      as_of: 'October 2026',
      is_sample: false,
    },
  ];
}
