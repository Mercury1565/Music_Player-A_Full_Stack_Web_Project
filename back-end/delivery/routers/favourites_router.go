package routers

import (
	"music_player_backend/config"
	"music_player_backend/delivery/controllers"
	"music_player_backend/repository"
	"music_player_backend/usecases"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewFavouritesRouter(env *config.Env, database mongo.Database, group *gin.RouterGroup) {
	userRepo := repository.NewUserRepo(database, "users")
	timeout := time.Duration(env.CONTEXT_TIMEOUT) * time.Second

	favouritesUsecase := usecases.NewFavouriteUsecase(userRepo, timeout)
	favouritesController := controllers.NewFavouritesController(favouritesUsecase)

	group.POST("/favourites/add/:id", favouritesController.AddFavouriteMusicController)
	group.POST("/favourites/remove/:id", favouritesController.RemoveFavouriteMusicController)
	group.GET("/favourites", favouritesController.GetFavouriteMusicController)

}
