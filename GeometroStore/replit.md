# Geometro - Mathematical Game E-commerce Application

## Overview

This is a full-stack e-commerce application for selling "Geometro," a mathematical board game focused on 3D geometry. The application features a product landing page with shopping cart functionality and order processing capabilities. Built with React, TypeScript, Express, and PostgreSQL, it provides a modern, responsive user experience for purchasing educational games and merchandise.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React hooks with custom cart management
- **Routing**: Wouter for client-side routing
- **API Client**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage (development) with PostgreSQL session store capability
- **API Design**: RESTful endpoints for order management

### Database Strategy
- **Primary Database**: Firebase Firestore (NoSQL document database)
- **Firebase Admin SDK**: Server-side Firebase operations with service account authentication
- **Schema**: Centralized schema definitions with Zod validation
- **Collections**: Orders stored in Firestore with auto-incrementing IDs using counters
- **Backup Strategy**: Drizzle ORM configuration maintained for potential PostgreSQL migration

## Key Components

### E-commerce Features
- **Product Catalog**: Static product listings with detailed descriptions
- **Shopping Cart**: Persistent cart with local storage, quantity management
- **Order Processing**: Complete order workflow with form validation
- **Product Variants**: Size and color selection for merchandise

### User Interface Components
- **Landing Page**: Hero section, product showcase, about section
- **Navigation**: Sticky header with smooth scrolling
- **Cart Management**: Slide-out cart sidebar with real-time updates
- **Order Modal**: Multi-step order form with validation
- **Responsive Design**: Mobile-first approach with breakpoint optimization

### Backend Services
- **Order API**: CRUD operations for order management
- **Data Validation**: Zod schema validation for all inputs
- **Error Handling**: Centralized error management with proper HTTP status codes
- **Development Tools**: Request logging and debugging capabilities

## Data Flow

### Order Processing Flow
1. **Product Selection**: User browses products and adds items to cart
2. **Cart Management**: Items stored in localStorage with quantity tracking
3. **Checkout Initiation**: User proceeds to checkout modal
4. **Order Validation**: Form data validated against Zod schemas
5. **Order Creation**: POST request to `/api/orders` with order details
6. **Order Storage**: Order persisted to Firebase Firestore database
7. **User Feedback**: Success/error notifications via toast system

### State Management
- **Cart State**: Custom React hook with localStorage persistence
- **Server State**: TanStack Query for API data fetching and caching
- **Form State**: React Hook Form with validation resolvers
- **UI State**: Local component state for modals and interactions

## External Dependencies

### Core Dependencies
- **UI Framework**: Radix UI components for accessibility
- **Styling**: Tailwind CSS for utility-first styling
- **Database**: Neon Database for serverless PostgreSQL
- **Validation**: Zod for runtime type checking
- **Date Handling**: date-fns for date manipulation

### Development Dependencies
- **Build Tools**: Vite for fast development and production builds
- **Type Checking**: TypeScript for static type safety
- **Code Quality**: ESLint and Prettier for code formatting
- **Development Server**: Express with Vite integration

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Database**: Neon Database connection for consistent development
- **Hot Reload**: Vite HMR for rapid development cycles
- **Error Handling**: Development-specific error overlays

### Production Build
- **Frontend**: Vite build with optimized assets
- **Backend**: ESBuild bundling for Node.js deployment
- **Static Assets**: Compiled to `dist/public` directory
- **Environment Variables**: DATABASE_URL for production database connection

### Architecture Decisions

#### Database Choice
- **Problem**: Need reliable data persistence for orders
- **Solution**: PostgreSQL with Drizzle ORM for type safety
- **Rationale**: Provides ACID compliance, strong typing, and easy migrations
- **Trade-offs**: More complex than file-based storage but necessary for production

#### State Management Approach
- **Problem**: Complex state between cart, UI, and server data
- **Solution**: Combination of React hooks, TanStack Query, and localStorage
- **Rationale**: Leverages React's built-in state management while providing persistence
- **Trade-offs**: No global state management library but simpler for this use case

#### Component Library Choice
- **Problem**: Need consistent, accessible UI components
- **Solution**: shadcn/ui with Radix UI primitives
- **Rationale**: Provides copy-paste components with full customization
- **Trade-offs**: Larger bundle size but better developer experience and accessibility

#### Development Storage Strategy
- **Problem**: Need simple development setup without complex database configuration
- **Solution**: In-memory storage class that can be easily swapped with database implementation
- **Rationale**: Allows rapid development while maintaining same interface
- **Trade-offs**: Data doesn't persist between server restarts in development