package main

import (
	"music_player_backend/config"
	"music_player_backend/delivery/routers"

	"github.com/gin-gonic/gin"
)

func main() {
	app := config.App()
	env := app.Env
	gin := gin.Default()

	database := app.Mongo.Database(env.DB_NAME)
	defer app.CloseMongoDBConnection()

	routers.Setup(env, *database, gin)
	gin.Run(env.SERVER_ADDRESS)
}
