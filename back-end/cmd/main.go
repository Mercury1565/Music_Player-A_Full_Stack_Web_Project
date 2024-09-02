package main

import (
	"music_player_backend/config"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	app := config.App()
	env := app.Env

	database := app.Mongo.Database(env.DB_NAME)
	defer app.CloseMongoDBConnection()

	timeout := time.Duration(env.CONTEXT_TIMEOUT) * time.Second

	gin := gin.Default()

	//route.Setup(env, timeout, *database, gin)
	gin.Run(env.SERVER_ADDRESS)
}
