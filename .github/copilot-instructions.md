# Countries Explorer React App

This is a React TypeScript application that provides a login system and country exploration interface.

## Features

- **Login Page**: Form validation with password requirements (8+ chars, 1 uppercase, 1 number, 1 symbol)
- **Home Page**: Countries listing with flags and regions from REST Countries API
- **Image Slider**: With next/previous navigation and dot indicators
- **Region Filtering**: Filter countries by continent
- **Load More Pagination**: Progressive loading of country data
- **Redux Toolkit**: State management for auth and countries
- **React-Bootstrap**: Responsive UI components
- **TypeScript**: Type-safe development

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`

## Architecture

- `/src/components/`: React components (Login, Home, Slider, PrivateRoute)
- `/src/store/`: Redux Toolkit store and slices
- `/src/store/slices/`: Auth and Countries state management

## Technologies Used

- React 18 with TypeScript
- Redux Toolkit for state management
- React-Bootstrap for UI components
- React Router for navigation
- Axios for API calls
- CSS3 for styling
