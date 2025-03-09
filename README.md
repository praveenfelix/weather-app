# Weather App with CI/CD Pipeline

A simple weather application with an automated CI/CD pipeline using Jenkins, Docker, and SonarQube.

## Features

- Real-time weather information using OpenWeatherMap API
- Responsive design
- Automated testing with Jest
- Code quality analysis with SonarQube
- Containerized deployment with Docker
- Automated CI/CD pipeline with Jenkins

## Prerequisites

- Node.js (v16 or higher)
- Docker
- Jenkins
- SonarQube
- OpenWeatherMap API key

## Local Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```bash
cp .env.example .env
```

4. Add your OpenWeatherMap API key to the .env file:
```
WEATHER_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Running Tests

```bash
npm test
```

## Docker Build

Build the Docker image:
```bash
docker build -t weather-app .
```

Run the container:
```bash
docker run -d -p 3000:3000 --name weather-app weather-app
```

## CI/CD Pipeline

The application includes a Jenkins pipeline that:
1. Checks out the code
2. Installs dependencies
3. Runs tests
4. Performs SonarQube analysis
5. Builds Docker image
6. Deploys the application

### Jenkins Setup

1. Install required Jenkins plugins:
   - Docker Pipeline
   - SonarQube Scanner
   - NodeJS

2. Configure Jenkins credentials:
   - Docker Hub credentials (if using private registry)
   - SonarQube token

3. Configure Jenkins tools:
   - NodeJS installation
   - SonarQube Scanner installation

4. Create a new Pipeline job using the Jenkinsfile in this repository

## Security Considerations

- Store sensitive information in Jenkins credentials
- Use environment variables for API keys
- Regular security updates for dependencies
- SonarQube security analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 