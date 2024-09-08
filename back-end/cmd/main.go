package main

import (
	"log"
	"music_player_backend/config"
	"music_player_backend/delivery/routers"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	app := config.App()
	env := app.Env
	gin := gin.Default()

	database := app.Mongo.Database(env.DB_NAME)
	defer app.CloseMongoDBConnection()

	routers.Setup(env, *database, gin)

	// Get the PORT from the environment (used by Vercel)
	port := os.Getenv("PORT")
	if port == "" {
		port = env.SERVER_ADDRESS
		if port == "" {
			port = ":8080"
		}
	}

	// Run the server
	log.Printf("Starting server on port %s...", port)
	gin.Run(":" + port)
}
