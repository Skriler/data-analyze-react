# Data Analysis Platform Frontend

React application providing interface for data analysis through similarity calculations and clustering algorithms. Features responsive design with advanced data visualization capabilities.

**Backend API**: [DataAnalyzeApi](https://github.com/Skriler/DataAnalyzeApi)

<img width="1907" height="902" alt="chrome_UOykIfCuEK" src="https://github.com/user-attachments/assets/037409c7-f712-462a-b8ab-0b7f672a57dc" />

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

<img width="1894" height="898" alt="chrome_HJjTR4d21o" src="https://github.com/user-attachments/assets/ec4a72e6-6588-4561-b2b6-93bf02772241" />

- **Interactive Dashboard**: Overview of all datasets with key statistics
- **Dataset Creation**: Modal-based interface with real-time validation
- **Data Visualization**: Interactive tables with parameter breakdown and search
- **Statistical Overview**: Real-time metrics including object counts and parameter distribution

### Analysis Interface

<img width="1886" height="908" alt="chrome_VVfTuRvDz2" src="https://github.com/user-attachments/assets/260fb763-9498-4a15-a802-4caa2683008d" />

- **Analysis Selection**: Interactive cards for algorithm selection
- **Parameter Configuration**: Dynamic forms for algorithm-specific settings
- **Weight Management**: Configurable parameter weights with visual feedback
- **Execution Monitoring**: Real-time analysis progress with loading states

### Results Visualization & Management

#### Similarity Analysis Results

<img width="1880" height="881" alt="chrome_IOctxtnMBc" src="https://github.com/user-attachments/assets/6077f7e2-147f-410b-ac73-f14ab21a1b83" />

- **Interactive Result Tables**: Sortable similarity pairs with percentage scores
- **Advanced Filtering**: Search and filter capabilities across all result pairs
- **Statistical Overview**: Distribution charts and similarity range analysis
- **Export Options**: Multiple view modes (List/Chart) with pagination

<img width="1852" height="519" alt="chrome_n1dc4QY67E" src="https://github.com/user-attachments/assets/c545f9c2-86e1-46b1-9f50-230d417b4192" />

#### Clustering Results Visualization

<img width="1876" height="890" alt="chrome_lbcT5Zubue" src="https://github.com/user-attachments/assets/47198dd4-99a2-4c48-8b33-071ed4e458c6" />

- **Algorithm Comparison**: Side-by-side result comparison for different clustering methods
- **Cluster Statistics**: Detailed cluster composition with member counts
- **Interactive Scatter Plots**: PCA-reduced 2D visualization with hover tooltips
- **Color-coded Groupings**: Distinct cluster visualization with member identification

<img width="1874" height="886" alt="chrome_bg4ADLjfvS" src="https://github.com/user-attachments/assets/c187d3ac-9a47-4c8b-809b-48e9f1a79001" />

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
