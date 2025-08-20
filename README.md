# Color Tagging UI

A modern React application for managing color-coded tags and organizing items with visual categorization.

## Features

- **Color Tag Management**: Create custom tags with names, colors, and descriptions
- **Item Organization**: Add items and assign multiple color tags to them
- **Visual Interface**: Clean, modern UI built with HeroUI components
- **Data Export**: Export your tags and items as JSON for backup or sharing
- **Real-time Updates**: Instantly see changes as you add, remove, or modify tags

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **HeroUI** - Beautiful UI component library
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Modern icon library

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

### Creating Color Tags

1. Enter a tag name in the "Tag Name" field
2. Optionally add a description
3. Choose a color using the color picker
4. Click "Add Tag" to create the tag

### Managing Items

1. Add new items using the input field in the "Items to Tag" section
2. Click on unassigned tags to add them to an item
3. Click the × on assigned tags to remove them
4. Delete items using the × button in the top-right corner of each item card

### Exporting Data

Click the "Export Data" button to download your tags and items as a JSON file for backup or sharing purposes.

## Project Structure

```
tagging-ui/
├── src/
│   ├── components/
│   │   └── ColorTaggingApp.tsx  # Main application component
│   ├── App.tsx                   # Root component with HeroUI provider
│   ├── main.tsx                  # Application entry point
│   └── index.css                 # Global styles and Tailwind imports
├── public/                       # Static assets
├── package.json                  # Dependencies and scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Contributing

Feel free to submit issues and pull requests to improve the application.

## License

MIT