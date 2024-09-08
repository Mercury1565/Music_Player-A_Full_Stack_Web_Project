package main

import (
	"music_player_backend/config"
	"music_player_backend/delivery/routers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Handler(w http.ResponseWriter, r *http.Request) {
	// Create a new Gin engine
	app := config.App()
	env := app.Env
	ginEngine := gin.New()

	// Connect to the database
	database := app.Mongo.Database(env.DB_NAME)
	defer app.CloseMongoDBConnection()

	// Set up your routes
	routers.Setup(env, *database, ginEngine)

	// Use gin's ServeHTTP to handle requests via HTTP
	ginEngine.ServeHTTP(w, r)
}
