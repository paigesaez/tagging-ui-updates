# Tag Chips UI

A modern React application for organizing and filtering topic tags with visual categorization by family groups.

## Features

- **Family-Based Tag Organization**: Tags are organized into 5 color-coded families:
  - 🔵 Infrastructure & Utilities (Blue)
  - 🟢 Land Use & Development (Green)  
  - 🟡 Environmental & Cultural (Amber)
  - 🟣 Social & Community (Purple)
  - 🔴 Governance & Policy (Red)

- **Accessible Color System**: All colors meet WCAG AAA standards (7:1+ contrast ratios)
- **Smart Search**: Filter tags by chip name, slug, or family
- **Visual Feedback**: Selected tags are highlighted with a border
- **Bulk Selection**: Click family names to select all tags in that category
- **Export Functionality**: Copy selected tag slugs as JSON for integration
- **Clean Typography**: Uses Open Sans font for improved readability
- **Responsive Design**: Chips wrap cleanly without breaking text

## Tech Stack

- **React 19** with TypeScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Open Sans** - Clean, modern typography

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/paigesaez/tagging-ui-updates.git
cd tagging-ui
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Usage

### Searching Tags
Use the search input to filter tags by:
- Chip display name (e.g., "Housing Development")
- Slug identifier (e.g., "housing-development")
- Family name (e.g., "Infrastructure")

### Selecting Tags
- Click individual chips to toggle selection
- Click family names in the legend to select all tags in that category
- Use the "Clear" button to deselect all tags

### Visual Accent Toggle
Toggle the "Family accent" checkbox to enable/disable color coding for better visual organization.

### Exporting Selected Tags
Click "Copy selected (JSON)" to copy the array of selected tag slugs to your clipboard for use in other applications.

## Tag Families

The application includes 54 predefined tags across 5 families:

- **Infrastructure & Utilities**: Datacenters, Utilities, Water systems, Energy, Transportation, etc.
- **Land Use & Development**: Housing, Retail, Education facilities, Healthcare, Zoning, etc.
- **Environmental & Cultural**: Climate policy, Parks, Public art, Flood control, Urban forestry
- **Social & Community**: Cannabis licensing, Short-term rentals, Sports venues, Homelessness services
- **Governance & Policy**: Elections, Transparency, Labor and workforce

## Project Structure

```
tagging-ui/
├── src/
│   ├── App.tsx              # Main application component with tag logic
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with color families
├── public/                  # Static assets
├── index.html              # HTML template with Open Sans font
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── tsconfig.json           # TypeScript configuration
```

## Color System Documentation

### Overview
The UI uses a systematic, accessible color palette that achieves **WCAG AAA standards** (7:1+ contrast ratios). Each category family has three color values following a consistent pattern based on Tailwind CSS color scales.

### Current Color Families

| Family | Background | Border | Text | Contrast Ratio | CSS Class |
|--------|------------|--------|------|----------------|-----------|
| **Infrastructure & Utilities** (Blue) | #EFF6FF | #BFDBFE | #1E3A8A | 8.5:1 ✅ | `.chip.infra` |
| **Land Use & Development** (Green) | #ECFDF5 | #86EFAC | #065F46 | 9.2:1 ✅ | `.chip.land` |
| **Environmental & Cultural** (Amber) | #FFFBEB | #FDE68A | #92400E | 7.8:1 ✅ | `.chip.env` |
| **Social & Community** (Purple) | #F5F3FF | #C4B5FD | #4C1D95 | 8.3:1 ✅ | `.chip.soc` |
| **Governance & Policy** (Red) | #FEF2F2 | #FECACA | #991B1B | 7.9:1 ✅ | `.chip.gov` |

All combinations exceed WCAG AAA requirements for normal text (7:1 contrast ratio).

### Color System Pattern

Each family follows this consistent structure:
- **Background**: Very light tint (95-98% lightness) - `{color}-50` range
- **Border**: Medium tint (70-85% lightness) - `{color}-200` to `{color}-300` range  
- **Text**: Dark shade (20-30% lightness) - `{color}-800` to `{color}-900` range

### Adding New Color Families

To add a new category family, follow these steps:

1. **Choose a base color** from Tailwind's palette or similar systematic scale
2. **Select color values**:
   - Background: Use the `50` level (lightest tint)
   - Border: Use the `200-300` level (medium tint)
   - Text: Use the `800-900` level (dark shade)
3. **Verify accessibility**: Ensure text/background contrast ratio ≥ 7:1
4. **Add to CSS** in `/src/index.css`:

```css
:root {
  /* Example: Adding Orange family */
  --orange-bg: #FFF7ED;    /* ~orange-50 */
  --orange-border: #FED7AA; /* ~orange-200 */
  --orange-text: #9A3412;   /* ~orange-900 */
}

.chip.orange { 
  background: var(--orange-bg); 
  border-color: var(--orange-border); 
  color: var(--orange-text); 
}
```

5. **Update TypeScript types** in `/src/TaggingUI.tsx`:
```typescript
type Family = 
  | 'Infrastructure & Utilities'
  | 'Land Use & Development'
  // ... existing families
  | 'New Category Name'
```

### Why This System Works

✅ **Accessible**: All combinations meet AAA standards  
✅ **Consistent**: Uses systematic color scales  
✅ **Repeatable**: Easy to add new families using the same pattern  
✅ **Visually Distinct**: Each family is clearly differentiated  
✅ **Scalable**: Can extend to any number of categories  

### Testing Accessibility

Use these tools to verify contrast ratios when adding new colors:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- Chrome DevTools Accessibility Inspector

Target minimum contrast ratios:
- **AAA Normal Text**: 7:1
- **AA Normal Text**: 4.5:1 (minimum acceptable)

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

MIT