# Data Analysis Platform Frontend

React application providing interface for data analysis through similarity calculations and clustering algorithms. Features responsive design with advanced data visualization capabilities.

**Backend API**: [DataAnalyzeApi](https://github.com/Skriler/DataAnalyzeApi)

![Dashboard Screenshot](screenshots/dashboard.png)

## Technologies & Tools

### Core Technologies

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS 4
- **Routing**: React Router for client-side navigation
- **State Management**: TanStack Query for server state

### UI & Design System

- **Component Library**: shadcn/ui built on Radix UI primitives
- **Data Visualization**: Chart.js for analytics and clustering charts
- **Form Management**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library
- **Notifications**: Custom toast system with auto-dismiss

### Development & Deployment

- **Code Quality**: TypeScript with strict configuration, ESLint, Prettier
- **Containerization**: Docker with multi-stage Nginx build
- **CI/CD**: GitHub Actions with automated deployment

## Features

### Authentication & User Management

- JWT-based authentication with token refresh
- User registration and login with comprehensive form validation
- Role-based access control (User/Admin permissions)
- Secure route protection with authentication guards

### Dataset Management

![Dataset Details](screenshots/dataset-details.png)

- **Interactive Dashboard**: Overview of all datasets with key statistics
- **Dataset Creation**: Modal-based interface with real-time validation
- **Data Visualization**: Interactive tables with parameter breakdown and search
- **Statistical Overview**: Real-time metrics including object counts and parameter distribution

### Analysis Interface

![Analysis Dashboard](screenshots/analysis-dashboard.png)

- **Analysis Selection**: Interactive cards for algorithm selection
- **Parameter Configuration**: Dynamic forms for algorithm-specific settings
- **Weight Management**: Configurable parameter weights with visual feedback
- **Execution Monitoring**: Real-time analysis progress with loading states

### Results Visualization & Management

#### Similarity Analysis Results

![Similarity Results](screenshots/similarity-results-list.png)

- **Interactive Result Tables**: Sortable similarity pairs with percentage scores
- **Advanced Filtering**: Search and filter capabilities across all result pairs
- **Statistical Overview**: Distribution charts and similarity range analysis
- **Export Options**: Multiple view modes (List/Chart) with pagination

![Similarity Charts](screenshots/similarity-results-charts.png)

#### Clustering Results Visualization

![Clustering Results List](screenshots/clustering-results-list.png)

- **Algorithm Comparison**: Side-by-side result comparison for different clustering methods
- **Cluster Statistics**: Detailed cluster composition with member counts
- **Interactive Scatter Plots**: PCA-reduced 2D visualization with hover tooltips
- **Color-coded Groupings**: Distinct cluster visualization with member identification

![Clustering Visualization](screenshots/clustering-results-chart.png)

## API Integration

### Complete Backend Coverage

Complete integration with [DataAnalyzeApi](https://github.com/Skriler/DataAnalyzeApi) covering all available endpoints:

- **Authentication**: Login, registration, logout, and token management
- **Dataset Operations**: CRUD operations with validation and error handling
- **Analysis Execution**: All similarity and clustering algorithms with parameter configuration
- **Result Retrieval**: Comprehensive result browsing with filtering capabilities

### Request Management

- **TanStack Query**: Intelligent caching with background data synchronization
- **Authentication Interceptors**: Automatic JWT token injection and refresh
- **Error Handling**: Centralized error processing with user-friendly messages
- **Loading Management**: Consistent loading states across all API interactions

## Development

### Environment Configuration

```bash
# Required environment variables
VITE_API_URL=http://localhost:5000  # Backend API URL
```

## Deployment

### Docker Configuration

**Production Container**:

- **Multi-stage Build**: Node.js build stage, Nginx serving stage
- **Optimized Assets**: Minified bundles with gzip compression
- **SPA Routing**: Nginx configuration for client-side routing support

### CI/CD Pipeline (GitHub Actions)

**Code Quality Stage**:

- ESLint validation and TypeScript compilation
- Production build verification
- Build artifact validation

**Deployment Stage** (master branch only):

- Docker image building on self-hosted runner
- Integration with backend deployment stack
- Automatic container cleanup

### Production Environment

Integrated with backend Docker Compose stack - see [DataAnalyzeApi](https://github.com/Skriler/DataAnalyzeApi) for complete infrastructure setup.

**Frontend Container Configuration**:

```yaml
data-analyze-frontend:
  image: data-analyze-frontend:latest
  container_name: data-analyze-frontend
  ports:
    - '3000:80'
  volumes:
    - ./nginx.conf:/etc/nginx/conf.d/default.conf
```
