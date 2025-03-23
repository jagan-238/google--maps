# Google Maps Project (Using Leaflet.js)

## Introduction
This project integrates interactive map-based functionalities using Leaflet.js instead of Google Maps. The application enables users to search for locations, mark important points, get real-time directions, and explore places efficiently. Features include search availability, route directions, and saved recent locations.

## Project Type
Frontend

## Deployed App
- **Frontend:** [Live Demo](https://gregarious-rolypoly-fa516b.netlify.app/)

## Directory Structure
```
project/
├── index.html      # Main HTML file
├── styles/         # CSS files
│   ├── day1.css
│   ├── day2.css
│   ├── day3.css
├── scripts/        # JavaScript files
│   ├── day1.js
│   ├── day2.js
│   ├── day3.js
├── pages/          # Feature pages
│   ├── day2.html   # Search
│   ├── day3.html   # Directions
│   ├── day4.html   # Saved locations
├── README.md       # Project documentation
```

## Features
- Search for locations using an interactive map
- Save locations, recent searches, and directions
- Enable audio play for navigation guidance
- Get real-time directions between locations
- Custom map themes and overlays

## Design Decisions or Assumptions
- The application uses Leaflet.js instead of Google Maps API for map rendering.
- Requires an internet connection to fetch map data.
- Designed to work on both desktop and mobile devices.

## Installation & Getting Started
Follow these steps to install and run the project:

```bash
# Clone the repository
git clone https://github.com/jagan-238/google--maps.git

# Navigate to the project directory
cd google--maps

# Open the index.html file in a browser
open index.html
```
## Usage
1. Open the deployed app: [Google Maps Project](https://gregarious-rolypoly-fa516b.netlify.app/)
2. Use the search bar to find a location.
3. Use the direction feature to get real-time routes between locations.
4. Enable audio play for navigation assistance.
5. Navigate to:
   - **Day 2** (Search Functionality)
   - **Day 3** (Directions)
   - **Day 4** (Saved & Recents)
6. Save locations and access recent searches.

### Example Usage
```bash
# Open the application in a browser
https://gregarious-rolypoly-fa516b.netlify.app/
```
## APIs Used
- No external API used; implemented using Leaflet.js.

## Technology Stack
- **HTML**
- **CSS**
- **JavaScript**
- **Leaflet.js** (for map functionality)

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

