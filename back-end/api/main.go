// package handler

package main

import (
	"music_player_backend/config"
	"music_player_backend/delivery/routers"

	"github.com/gin-gonic/gin"
)

// var ginEngine *gin.Engine
// var app config.Application

// func init() {
// 	app = config.App()
// 	env := app.Env

// 	ginEngine = gin.New()
// 	database := app.Mongo.Database(env.DB_NAME)

// 	routers.Setup(env, *database, ginEngine)
// }

// func Handler(w http.ResponseWriter, r *http.Request) {
// 	ginEngine.ServeHTTP(w, r)
// }

func main() {
	app := config.App()
	env := app.Env
	gin := gin.Default()

	database := app.Mongo.Database(env.DB_NAME)
	defer app.CloseMongoDBConnection()

	routers.Setup(env, *database, gin)
	gin.Run(env.SERVER_ADDRESS)
}