YO_WEATHER 🌦️
YO_WEATHER is a weather forecasting application built using Next.js (App Router). It provides users with real-time weather information, including current weather, daily and hourly forecasts, and location-based predictions.

🚀 Features
Key Features:
Real-time weather data for the selected or current location.
Geolocation support: Automatically detects the user's location to display the weather forecast.
Hourly and daily weather forecasts with detailed data.
Multi-language support.
Dark and light mode themes.
PWA (Progressive Web App): Offline access and installation support.
Voice input: Search for weather information using voice commands.

🛠 Technologies Used
Frontend: Next.js (App Router), TypeScript, Tailwind CSS.
Backend: Weather API (REST API for weather data).
Styling: Tailwind CSS, framer-motion for animations.
Geolocation: Google Maps API.
PWA: Powered by @ducanh2912/next-pwa.
State Management: Zustand.
Notifications: Sonner.

📋 Requirements
Ensure you have the following installed before proceeding:

Node.js: Version 18 or higher
Yarn: Package manager
API Keys:
You will need the following API keys:

Weather API: Sign up and get an API key.
Google Maps API Key: Get your API key here.

Copy .env.example to .env.local and fill in the required values:
WEATHER_API_KEY=your_WeatherAPI_key
WEATHER_URL=https://api.weatherapi.com/v1
GOOGLE_MAPS_API_KEY=your_GoogleMapsAPI_key

⚙️ Installation and Setup

1. Clone the repository
   bash
   git clone https://github.com/your_username/yo_weather.git
   cd yo_weather
2. Install dependencies
   Install all dependencies using Yarn:

bash
yarn install 3. Run the project
To start the development server:

bash
yarn dev
The application will be available at: http://localhost:3000

4. Build and run for production
   To build the production-ready application:

bash
yarn build
To start the production server:

bash
yarn start

📖 Key Dependencies
React: Library for building user interfaces.
Next.js: Server-side rendering and routing framework.
Tailwind CSS: Utility-first CSS framework for styling.
Sonner: For toast notifications.
framer-motion: Animation library for UI interactions.
@ducanh2912/next-pwa: Enables PWA capabilities for offline support.

💡 How to Use
Get weather for your current location:
Click the "Current Location" button.
Grant location access in your browser.
Find weather for another city:
Enter the city name in the search box.
Press Enter or click the search button.
Use voice input:
Click the microphone button.
Speak the name of the city.
