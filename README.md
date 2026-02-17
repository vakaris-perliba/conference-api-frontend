# Conference Planner API

A modern .NET 8 Web API for managing conference sessions, speakers, and attendees.

## Features

- **Sessions Management**: Create, read, update, and delete conference sessions
- **Speaker Management**: Manage speaker profiles and their sessions
- **Attendee Management**: Handle attendee registrations and session attendance
- **Search**: Search across sessions and speakers
- **Health Checks**: Built-in health monitoring endpoint
- **OpenAPI/Swagger**: Interactive API documentation
- **Auto-Seeding**: Sample data automatically populated on first run

## Technologies

- .NET 8
- ASP.NET Core Web API (MVC Controllers)
- Entity Framework Core 8
- SQLite Database
- Swagger/OpenAPI

## Architecture

- **MVC Controllers**: Traditional controller-based architecture
- **Dependency Injection**: Constructor-based DI
- **Repository Pattern**: EF Core DbContext
- **DTO Pattern**: Separate data transfer objects
- **Auto-Mapper**: Entity extension methods

## Getting Started

### Prerequisites

- .NET 8 SDK or later

### Installation

1. Clone the repository
2. Navigate to the Conference.API project directory:
   ```bash
   cd Conference.API
   ```

3. Restore dependencies:
   ```bash
   dotnet restore
   ```

4. **Database Setup** - Choose one of the following options:

   **Option A: Automatic (Recommended) ⭐**
   
   Just run the application - migrations and sample data will be added automatically:
   ```bash
   dotnet run
   ```
   
   **What you get:**
   - ✅ Database created with all tables
   - ✅ 5 conference tracks
   - ✅ 6 speakers (Microsoft team members)
   - ✅ 10 sessions across 2 conference days
   - ✅ 3 sample attendees with registrations
   - ✅ Ready to test immediately!

   **Option B: Manual Migration**
   
   Apply database migrations manually:
   ```bash
   dotnet ef database update
   ```

   **Option C: Create New Migration (if needed)**
   
   If migrations don't exist or you've modified the models:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. The API will be available at `https://localhost:7112` (or the port shown in console).
   Swagger UI will be available at the root URL.

## Sample Data

On first run, the database is automatically populated with realistic sample data:

**Tracks (5):**
- Backend Development
- Frontend Development
- Cloud & DevOps
- Mobile Development
- Data & AI

**Speakers (6):**
- Scott Hunter (VP of Product for Azure Developer Experience)
- David Fowler (Creator of SignalR)
- Safia Abdalla (ASP.NET Core Engineer)
- Glenn Condron (ASP.NET Core Program Manager)
- Mads Kristensen (Visual Studio Principal PM)
- Damian Edwards (ASP.NET Principal Architect)

**Sessions (10):**
Including topics like "What's New in .NET 8", "Building Modern Web Apps with Blazor", "ASP.NET Core Performance Best Practices", and more!

**Attendees (3):**
- johndoe, janesmith, bobjohnson - all with sample session registrations

## Database Notes

- The application uses SQLite and creates a database file named `ConferencePlanner.db` in the Conference.API directory
- **Auto-migration is enabled** - the database will be created and updated automatically on startup
- **Auto-seeding is enabled** - sample data is added only if the database is empty
- To reset the database, simply delete the `ConferencePlanner.db` file and restart the app
- Migrations are located in the `Conference.API/Migrations` folder
- Seed data configuration is in `Conference.API/Data/SeedData.cs`

## API Endpoints

All endpoints are implemented using MVC Controllers for better organization and testability.

### Sessions (SessionsController)
- `GET /api/sessions` - Get all sessions
- `GET /api/sessions/{id}` - Get a specific session
- `POST /api/sessions` - Create a new session
- `PUT /api/sessions/{id}` - Update a session
- `DELETE /api/sessions/{id}` - Delete a session
- `POST /api/sessions/upload` - Upload session data

### Speakers (SpeakersController)
- `GET /api/speakers` - Get all speakers
- `GET /api/speakers/{id}` - Get a specific speaker

### Attendees (AttendeesController)
- `GET /api/attendees/{username}` - Get attendee by username
- `GET /api/attendees/{username}/sessions` - Get sessions for an attendee
- `POST /api/attendees` - Create a new attendee
- `POST /api/attendees/{username}/sessions/{sessionId}` - Add attendee to a session
- `DELETE /api/attendees/{username}/sessions/{sessionId}` - Remove attendee from a session

### Search (SearchController)
- `GET /api/search/{term}` - Search sessions and speakers

### Health
- `GET /health` - Health check endpoint

## Quick Test

Once the app is running, try these endpoints with the pre-populated data:

```bash
# Get all sessions (returns 10 sample sessions)
curl https://localhost:7112/api/sessions

# Get a specific speaker
curl https://localhost:7112/api/speakers/1

# Search for .NET related content
curl https://localhost:7112/api/search/.NET

# Get attendee with sessions
curl https://localhost:7112/api/attendees/johndoe
```

## Configuration

Edit `appsettings.json` to configure:
- Database connection string
- Logging levels
- CORS policies
- Other application settings

## Development

The project uses:
- **MVC Controllers**: Traditional controller-based API architecture
- **Dependency Injection**: Constructor-based service injection
- **Action Results**: Type-safe HTTP responses
- **Route Attributes**: Convention-based routing
- **EF Core**: Database access with migrations
- **Health Checks**: Application health monitoring
- **Auto-Migration**: Database automatically created/updated on startup
- **Auto-Seeding**: Sample data populated on first run
- **XML Documentation**: Enhanced Swagger documentation

## Database

The application uses SQLite by default. To change the database provider:
1. Update the connection string in `appsettings.json`
2. Modify the DbContext configuration in `Program.cs`
3. Install the appropriate EF Core provider package

### EF Core Commands

```bash
# Add a new migration
dotnet ef migrations add MigrationName

# Update database to latest migration
dotnet ef database update

# Remove last migration (if not applied)
dotnet ef migrations remove

# List all migrations
dotnet ef migrations list
```

### Customize Sample Data

To modify the sample data, edit `Conference.API/Data/SeedData.cs`. The seeding logic:
- Checks if data exists before seeding (won't duplicate data)
- Creates tracks, speakers, sessions, and attendees
- Establishes relationships between entities
- Logs progress to the console

## Project Structure

```
ConferencePlanner/
├── Conference.API/
│   ├── Controllers/       # MVC API Controllers
│   │   ├── SessionsController.cs
│   │   ├── SpeakersController.cs
│   │   ├── AttendeesController.cs
│   │   └── SearchController.cs
│   ├── Data/              # Entity models and DbContext
│   │   ├── SeedData.cs    # Sample data configuration
│   │   └── ...
│   ├── Infrastructure/    # Extension methods and utilities
│   ├── Migrations/        # EF Core migrations
│   └── Program.cs         # Application entry point
└── Conference.Model/      # Data transfer objects
```

## Troubleshooting

### "SQLite Error 1: 'no such table: Speakers'" or similar errors
- **Solution**: The database hasn't been initialized. With the latest changes, this should happen automatically. If you still see this error:
  1. Delete the `ConferencePlanner.db` file
  2. Run `dotnet ef database update` or just restart the app
  3. The database will be recreated with all tables and sample data

### "Unable to create an object of type 'ApplicationDbContext'"
- **Solution**: Make sure you're in the `Conference.API` directory when running EF Core commands

### Port already in use
- **Solution**: Change the port in `Conference.API/Properties/launchSettings.json`

### No sample data appears
- **Solution**: The seeding logic only runs if the database is empty. To reset:
  1. Stop the application
  2. Delete `ConferencePlanner.db`
  3. Run `dotnet run` again

## Testing

The controller-based architecture makes testing straightforward:

```csharp
[Fact]
public async Task GetAllSessions_ReturnsOkResult_WithListOfSessions()
{
    // Arrange
    var controller = new SessionsController(mockDbContext, mockLogger);

    // Act
    var result = await controller.GetAllSessions();

    // Assert
    var okResult = Assert.IsType<OkObjectResult>(result.Result);
    var sessions = Assert.IsAssignableFrom<List<SessionResponse>>(okResult.Value);
    Assert.NotEmpty(sessions);
}
```

## Documentation

- [API Documentation](API_DOCUMENTATION.md) - Complete API reference
- [Quick Start Guide](QUICK_START.md) - Get started in 5 minutes

## License

This is a sample project for educational purposes.
