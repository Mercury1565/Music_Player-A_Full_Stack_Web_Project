package handler

import (
	"music_player_backend/config"
	"music_player_backend/delivery/routers"
	"net/http"

	"github.com/gin-gonic/gin"
)

var ginEngine *gin.Engine
var app config.Application

func init() {
	app = config.App()
	env := app.Env

	ginEngine = gin.New()
	database := app.Mongo.Database(env.DB_NAME)

	routers.Setup(env, *database, ginEngine)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	ginEngine.ServeHTTP(w, r)
}