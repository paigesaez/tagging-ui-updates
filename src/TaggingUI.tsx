import { useMemo, useState } from 'react'

type Family =
  | 'Infrastructure & Utilities'
  | 'Land Use & Development'
  | 'Environmental & Cultural'
  | 'Social & Community'
  | 'Governance & Policy'

type Tag = { 
  chip: string; 
  slug: string; 
  family: Family; 
  existing?: boolean;
  topic?: string; // canonical topic from the CSV
}

const TAGS: Tag[] = [
  // Infrastructure & Utilities — Blue
  { chip: 'Data Center', slug: 'data-center', topic: 'Datacenters', family: 'Infrastructure & Utilities', existing: true },
  { chip: 'Utilities', slug: 'utilities', topic: 'Utilities (Water, Power, Wastewater)', family: 'Infrastructure & Utilities' },
  { chip: 'Water & Wastewater', slug: 'water-wastewater', topic: 'Water / Wastewater / Stormwater', family: 'Infrastructure & Utilities' },
  { chip: 'Waste & Recycling', slug: 'waste-recycling', topic: 'Waste & Recycling Facilities', family: 'Infrastructure & Utilities' },
  { chip: 'Renewable Energy', slug: 'renewable-energy', topic: 'Renewable Energy & Storage', family: 'Infrastructure & Utilities' },
  { chip: 'EV Infrastructure', slug: 'ev-infrastructure', topic: 'Electric-Vehicle Infrastructure', family: 'Infrastructure & Utilities' },
  { chip: 'Telecom / 5G', slug: 'telecom-5g', topic: 'Telecom – 5G Small-Cell Deployment', family: 'Infrastructure & Utilities' },
  { chip: 'Transit Infrastructure', slug: 'transit-infra', topic: 'Transportation & Transit Infrastructure', family: 'Infrastructure & Utilities' },

  // Land Use & Development — Green
  { chip: 'Housing', slug: 'housing', topic: 'Housing Policy', family: 'Land Use & Development', existing: true },
  { chip: 'Housing Development', slug: 'housing-development', topic: 'Housing & Residential Development', family: 'Land Use & Development' },
  { chip: 'New Multifamily Housing', slug: 'new-multifamily-housing', topic: 'New Multifamily Housing', family: 'Land Use & Development', existing: true },
  { chip: 'Retail & Commercial Redevelopment', slug: 'retail-commercial', topic: 'Retail & Commercial Redevelopment', family: 'Land Use & Development' },
  { chip: 'Civic & Public Safety', slug: 'civic-safety', topic: 'Civic & Public-Safety Buildings', family: 'Land Use & Development' },
  { chip: 'Education Facilities', slug: 'education-facilities', topic: 'Education-Facility Capital Projects', family: 'Land Use & Development' },
  { chip: 'Senior Living', slug: 'senior-living', topic: 'Senior & Assisted-Living Projects', family: 'Land Use & Development' },
  { chip: 'Healthcare Facilities', slug: 'healthcare', topic: 'Healthcare & Life-Science Facilities', family: 'Land Use & Development' },
  { chip: 'Industrial Real Estate', slug: 'industrial-real-estate', topic: 'Industrial', family: 'Land Use & Development', existing: true },
  { chip: 'Zoning', slug: 'zoning', topic: 'Zoning Actions (with Subtypes)', family: 'Land Use & Development', existing: true },

  // Environmental & Cultural — Amber
  { chip: 'Environmental & Climate Policy', slug: 'climate-policy', topic: 'Environmental & Climate Policy Actions', family: 'Environmental & Cultural' },

  // Social & Community — Purple
  { chip: 'Cannabis Licensing', slug: 'cannabis', topic: 'Cannabis Facilities & Licensing', family: 'Social & Community' },
  { chip: 'Short-Term Rentals', slug: 'short-term-rentals', topic: 'Hospitality & Short-Term-Rental Regulation', family: 'Social & Community' },
  { chip: 'Sports & Venues', slug: 'sports-venues', topic: 'Sports, Entertainment & Cultural Venues', family: 'Social & Community' },

  // Governance & Policy — Red
  { chip: 'Impact Fees', slug: 'impact-fees', topic: 'Impact Fees', family: 'Governance & Policy', existing: true },
  { chip: 'RFPs', slug: 'rfps', topic: 'Requests for Proposals (RFPs)', family: 'Governance & Policy' },
]

const FAMILY_CLASS: Record<Family, string> = {
  'Infrastructure & Utilities': 'infra',
  'Land Use & Development': 'land',
  'Environmental & Cultural': 'env',
  'Social & Community': 'soc',
  'Governance & Policy': 'gov',
}

const FAMILY_STYLES: Record<Family, { color: string; name: string }> = {
  'Infrastructure & Utilities': {
    name: 'Blue',
    color: '29, 78, 216'  // #1D4ED8
  },
  'Land Use & Development': {
    name: 'Green', 
    color: '5, 150, 105'  // #059669
  },
  'Environmental & Cultural': {
    name: 'Amber',
    color: '217, 119, 6'  // #D97706
  },
  'Social & Community': {
    name: 'Purple',
    color: '124, 58, 237'  // #7C3AED
  },
  'Governance & Policy': {
    name: 'Red',
    color: '220, 38, 38'  // #DC2626
  }
}

export default function TaggingUI() {
  const [accented] = useState(true)

  const grouped = useMemo(() => {
    return TAGS.reduce<Record<Family, Tag[]>>((acc, t) => {
      ;(acc[t.family] ||= []).push(t)
      return acc
    }, {} as Record<Family, Tag[]>)
  }, [])


  return (
    <div className="app">
      <div className="categories-container">
        <div className="categories-header">
          <div className="column-left">Category</div>
          <div className="column-right">Tags</div>
        </div>
        
        {Object.entries(grouped).map(([family, items]) => {
          const existingTags = items.filter(t => t.existing)
          const newTags = items.filter(t => !t.existing)
          const styles = FAMILY_STYLES[family as Family]
          
          return (
            <div key={family} className="category-row">
              <div className="category-reference">
                <div className="category-header-box">
                  <div className="category-title">
                    {family}
                  </div>
                  <div className="color-info">
                    <span 
                      className="color-dot"
                      style={{ backgroundColor: `rgb(${styles.color})` }}
                    />
                    <span className="color-hex">
                      #{styles.color.split(', ').map(c => parseInt(c).toString(16).padStart(2, '0')).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="category-styles-inline">
                    <div className="css-code-inline">
{`--${FAMILY_CLASS[family as Family]}-color: ${styles.color};

.chip.${FAMILY_CLASS[family as Family]} {
  background: rgba(var(--${FAMILY_CLASS[family as Family]}-color), 0.08);
  border: 1px solid rgba(var(--${FAMILY_CLASS[family as Family]}-color), 0.5);
  color: rgb(var(--${FAMILY_CLASS[family as Family]}-color));
}`}
                    </div>
                    <button
                      type="button" 
                      className="copy-css-btn-inline"
                      onClick={async () => {
                        const css = `--${FAMILY_CLASS[family as Family]}-color: ${styles.color};\n\n.chip.${FAMILY_CLASS[family as Family]} {\n  background: rgba(var(--${FAMILY_CLASS[family as Family]}-color), 0.08);\n  border: 1px solid rgba(var(--${FAMILY_CLASS[family as Family]}-color), 0.5);\n  color: rgb(var(--${FAMILY_CLASS[family as Family]}-color));\n}`;
                        await navigator.clipboard.writeText(css);
                        alert(`Copied ${family} CSS to clipboard`);
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="family-tags">
                {existingTags.length > 0 && (
                  <div className="tag-group">
                    <div className="tag-group-label">Existing Topics</div>
                    <div className="chips">
                      {existingTags.map(t => (
                        <div key={t.slug} className="chip-wrapper">
                          <div
                            className={`chip ${accented ? FAMILY_CLASS[t.family as Family] : ''} chip-existing`}
                            title={`Topic: ${t.topic || t.chip}\nSlug: ${t.slug}\nStatus: Existing`}
                          >
                            {t.chip}
                          </div>
                          {t.topic && (
                            <div className="topic-label">{t.topic}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {newTags.length > 0 && (
                  <div className="tag-group">
                    <div className="tag-group-label">New Topics</div>
                    <div className="chips">
                      {newTags.map(t => (
                        <div key={t.slug} className="chip-wrapper">
                          <div
                            className={`chip ${accented ? FAMILY_CLASS[t.family as Family] : ''} chip-new`}
                            title={`Topic: ${t.topic || t.chip}\nSlug: ${t.slug}\nStatus: New`}
                          >
                            {t.chip}
                          </div>
                          {t.topic && (
                            <div className="topic-label">{t.topic}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}