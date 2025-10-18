# Countries Explorer React App

A modern React TypeScript application featuring user authentication and an interactive country exploration interface.

## 🌟 Features

### Authentication

- **Secure Login Form**: Email and password validation
- **Password Requirements**: Minimum 8 characters with 1 uppercase letter, 1 number, and 1 symbol
- **Form Validation**: Real-time validation with error messages
- **Route Protection**: Private routes requiring authentication

### Country Explorer

- **Countries Grid**: Display countries with flags and region information
- **REST API Integration**: Fetches data from `https://restcountries.com/v2/all`
- **Region Filtering**: Filter countries by continent/region
- **Load More Pagination**: Progressive loading for better performance
- **Responsive Design**: Mobile-first approach with Bootstrap

### Interactive Slider

- **Navigation Controls**: Next/Previous buttons
- **Dot Indicators**: Visual navigation dots
- **Auto-play**: Optional automatic progression
- **Touch/Swipe Support**: Mobile-friendly interactions

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd countries-explorer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm start
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Creates production build
- `npm test` - Runs test suite
- `npm run eject` - Ejects from Create React App (irreversible)

## 🏗️ Architecture

### Project Structure

```
src/
├── components/           # React components
│   ├── Login.tsx        # Login page component
│   ├── Home.tsx         # Home page with countries
│   ├── Slider.tsx       # Image slider component
│   └── PrivateRoute.tsx # Route protection wrapper
├── store/               # Redux Toolkit store
│   ├── index.ts         # Store configuration
│   ├── hooks.ts         # Typed Redux hooks
│   └── slices/          # Redux slices
│       ├── authSlice.ts # Authentication state
│       └── countriesSlice.ts # Countries data state
└── App.tsx              # Main application component
```

### State Management

- **Redux Toolkit** for efficient state management
- **Auth Slice**: Manages user authentication state
- **Countries Slice**: Handles country data, filtering, and pagination
- **Typed Hooks**: Type-safe Redux hooks for TypeScript

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: React-Bootstrap
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3 with Bootstrap
- **Icons**: Font Awesome
- **Build Tool**: Create React App

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adapted layout with touch-friendly controls
- **Mobile**: Stacked layout with collapsible navigation

## 🔐 Login Credentials

For testing purposes, you can use any valid email format with a password that meets the requirements:

- **Email**: Any valid email format (e.g., `test@example.com`)
- **Password**: At least 8 characters with 1 uppercase, 1 number, 1 symbol (e.g., `Password123!`)

## 🌍 API Integration

- **Endpoint**: `https://restcountries.com/v2/all?fields=name,region,flag`
- **Data**: Country name, region, and flag image
- **Caching**: Redux state caches API responses
- **Error Handling**: Graceful error handling with user feedback

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface
- **Loading States**: Skeleton loaders and spinners
- **Error States**: User-friendly error messages
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: ARIA labels and keyboard navigation

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The `build` folder can be deployed to any static hosting service like:

- Netlify
- Vercel
- GitHub Pages
- AWS S3

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
