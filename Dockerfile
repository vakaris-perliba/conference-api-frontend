# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy project files
COPY ["BackEnd/BackEnd.csproj", "BackEnd/"]
COPY ["ConferenceDTO/ConferenceDTO.csproj", "ConferenceDTO/"]

# Restore dependencies
RUN dotnet restore "BackEnd/BackEnd.csproj"

# Copy everything else
COPY . .

# Build the application
WORKDIR "/src/BackEnd"
RUN dotnet build "BackEnd.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "BackEnd.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackEnd.dll"]
