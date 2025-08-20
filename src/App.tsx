import { useMemo, useState } from 'react'

type Family =
  | 'Infrastructure & Utilities'
  | 'Land Use & Development'
  | 'Environmental & Cultural'
  | 'Social & Community'
  | 'Governance & Policy'

type Tag = { chip: string; slug: string; family: Family }

const TAGS: Tag[] = [
  // Infrastructure & Utilities — Blue
  { chip: 'Datacenters', slug: 'datacenters', family: 'Infrastructure & Utilities' },
  { chip: 'Utilities', slug: 'utilities', family: 'Infrastructure & Utilities' },
  { chip: 'Water & Wastewater', slug: 'water-wastewater', family: 'Infrastructure & Utilities' },
  { chip: 'Waste & Recycling', slug: 'waste-recycling', family: 'Infrastructure & Utilities' },
  { chip: 'Renewable Energy', slug: 'renewable-energy', family: 'Infrastructure & Utilities' },
  { chip: 'EV Infrastructure', slug: 'ev-infrastructure', family: 'Infrastructure & Utilities' },
  { chip: 'Telecom / 5G', slug: 'telecom-5g', family: 'Infrastructure & Utilities' },
  { chip: 'Transit Infrastructure', slug: 'transit-infra', family: 'Infrastructure & Utilities' },
  { chip: 'Active Transportation', slug: 'active-transportation', family: 'Infrastructure & Utilities' },
  { chip: 'Parking & Curb', slug: 'parking-curb', family: 'Infrastructure & Utilities' },
  { chip: 'Airports', slug: 'airports', family: 'Infrastructure & Utilities' },
  { chip: 'Ports & Harbors', slug: 'ports-harbors', family: 'Infrastructure & Utilities' },

  // Land Use & Development — Green
  { chip: 'Housing Development', slug: 'housing-development', family: 'Land Use & Development' },
  { chip: 'Retail & Commercial Redevelopment', slug: 'retail-commercial', family: 'Land Use & Development' },
  { chip: 'Civic & Public Safety', slug: 'civic-safety', family: 'Land Use & Development' },
  { chip: 'Education Facilities', slug: 'education-facilities', family: 'Land Use & Development' },
  { chip: 'Senior Living', slug: 'senior-living', family: 'Land Use & Development' },
  { chip: 'Healthcare Facilities', slug: 'healthcare', family: 'Land Use & Development' },
  { chip: 'Industrial Facilities', slug: 'industrial-facilities', family: 'Land Use & Development' },
  { chip: 'Historic Preservation', slug: 'historic-preservation', family: 'Land Use & Development' },
  { chip: 'Zoning', slug: 'zoning', family: 'Land Use & Development' },

  // Environmental & Cultural — Amber
  { chip: 'Environmental & Climate Policy', slug: 'climate-policy', family: 'Environmental & Cultural' },
  { chip: 'Parks & Open Space', slug: 'parks-open-space', family: 'Environmental & Cultural' },
  { chip: 'Public Art', slug: 'public-art', family: 'Environmental & Cultural' },
  { chip: 'Flood Control', slug: 'flood-control', family: 'Environmental & Cultural' },
  { chip: 'Urban Forestry', slug: 'urban-forestry', family: 'Environmental & Cultural' },

  // Social & Community — Purple
  { chip: 'Cannabis Licensing', slug: 'cannabis', family: 'Social & Community' },
  { chip: 'Short-Term Rentals', slug: 'short-term-rentals', family: 'Social & Community' },
  { chip: 'Sports & Venues', slug: 'sports-venues', family: 'Social & Community' },
  { chip: 'Homelessness Services', slug: 'homelessness', family: 'Social & Community' },

  // Governance & Policy — Red
  { chip: 'Governance & Elections', slug: 'governance-elections', family: 'Governance & Policy' },
  { chip: 'Transparency & Audits', slug: 'transparency-audits', family: 'Governance & Policy' },
  { chip: 'Labor & Workforce', slug: 'labor-workforce', family: 'Governance & Policy' },
]

const FAMILY_CLASS: Record<Family, string> = {
  'Infrastructure & Utilities': 'infra',
  'Land Use & Development': 'land',
  'Environmental & Cultural': 'env',
  'Social & Community': 'soc',
  'Governance & Policy': 'gov',
}

export default function App() {
  const [q, setQ] = useState('')
  const [accented, setAccented] = useState(true)
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return TAGS
    return TAGS.filter(t =>
      t.chip.toLowerCase().includes(s) ||
      t.slug.toLowerCase().includes(s) ||
      t.family.toLowerCase().includes(s)
    )
  }, [q])

  const grouped = useMemo(() => {
    return filtered.reduce<Record<Family, Tag[]>>((acc, t) => {
      ;(acc[t.family] ||= []).push(t)
      return acc
    }, {} as Record<Family, Tag[]>)
  }, [filtered])

  const toggle = (slug: string) => {
    setSelected(prev => prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug])
  }

  const selectFamily = (fam: Family) => {
    const slugs = TAGS.filter(t => t.family === fam).map(t => t.slug)
    setSelected(slugs)
  }

  const clear = () => setSelected([])

  const copyJSON = async () => {
    const payload = JSON.stringify(selected, null, 2)
    await navigator.clipboard.writeText(payload)
    alert('Copied selected slugs to clipboard.')
  }

  return (
    <div className="app">
      <div>
        <div className="h1">Topic Tags</div>
        <div className="subtle">Tertiary pill chips with family grouping. Search, toggle accents, or select a whole family.</div>
      </div>

      <div className="row">
        <input
          className="input"
          placeholder="Search chips, slugs, or families…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <label className="row" style={{ gap: 6 }}>
          <input type="checkbox" checked={accented} onChange={e => setAccented(e.target.checked)} />
          <span className="subtle">Family accent</span>
        </label>
        <button className="btn" onClick={clear}>Clear</button>
        <button className="btn" onClick={copyJSON}>Copy selected (JSON)</button>
      </div>

      <div className="legend">
        <div className="row">
          <button className="swatch" style={{ background: 'var(--infra-bg)', borderColor: 'var(--infra-border)', color: 'var(--infra-text)' }} onClick={() => selectFamily('Infrastructure & Utilities')}>
            <span className="dot" style={{ background: 'var(--infra-text)' }} /> Infrastructure & Utilities
          </button>
          <button className="swatch" style={{ background: 'var(--land-bg)', borderColor: 'var(--land-border)', color: 'var(--land-text)' }} onClick={() => selectFamily('Land Use & Development')}>
            <span className="dot" style={{ background: 'var(--land-text)' }} /> Land Use & Development
          </button>
          <button className="swatch" style={{ background: 'var(--env-bg)', borderColor: 'var(--env-border)', color: 'var(--env-text)' }} onClick={() => selectFamily('Environmental & Cultural')}>
            <span className="dot" style={{ background: 'var(--env-text)' }} /> Environmental & Cultural
          </button>
          <button className="swatch" style={{ background: 'var(--soc-bg)', borderColor: 'var(--soc-border)', color: 'var(--soc-text)' }} onClick={() => selectFamily('Social & Community')}>
            <span className="dot" style={{ background: 'var(--soc-text)' }} /> Social & Community
          </button>
          <button className="swatch" style={{ background: 'var(--gov-bg)', borderColor: 'var(--gov-border)', color: 'var(--gov-text)' }} onClick={() => selectFamily('Governance & Policy')}>
            <span className="dot" style={{ background: 'var(--gov-text)' }} /> Governance & Policy
          </button>
        </div>
      </div>

      <div className="section">
        {Object.entries(grouped).map(([family, items]) => (
          <div key={family}>
            <div className="family">{family}</div>
            <div className="chips">
              {items.map(t => (
                <button
                  key={t.slug}
                  className={`chip ${accented ? FAMILY_CLASS[t.family as Family] : ''}`}
                  onClick={() => toggle(t.slug)}
                  aria-pressed={selected.includes(t.slug)}
                  title={`${t.chip} (${t.slug})`}
                >
                  {t.chip}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="family">Selected slugs</div>
        <div className="code">{selected.length ? JSON.stringify(selected, null, 2) : 'No tags selected'}</div>
      </div>
    </div>
  )
}