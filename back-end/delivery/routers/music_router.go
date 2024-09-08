package routers

import (
	"music_player_backend/config"
	"music_player_backend/delivery/controllers"
	"music_player_backend/infrastructure"
	"music_player_backend/repository"
	"music_player_backend/usecases"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewMusicRouter(env *config.Env, database mongo.Database, group *gin.RouterGroup) {
	cloud, _ := config.NewCloudinaryConfig(env)

	musicRepo := repository.NewMusicRepo(database, "music", "genres")
	cloudinaryService := infrastructure.NewCloudinaryService(cloud, env)
	timeout := time.Duration(env.CONTEXT_TIMEOUT) * time.Second

	musicUsecase := usecases.NewMusicUsecase(musicRepo, cloudinaryService, timeout)
	musicController := controllers.NewMusicController(musicUsecase, cloudinaryService)

	group.POST("/music", musicController.CreateMusicController)
	group.DELETE("/music/:id", musicController.DeleteMusicController)

	group.GET("/music/:id", musicController.GetMusicController)
	group.GET("/musics/your", musicController.GetMusicsByArtistIDController)
	group.GET("/music/filter", musicController.SearchMusicsController)
	group.GET("/musics", musicController.GetMusicsController)
	group.GET("/musics/top", musicController.GetTopMusicsController)
	group.GET("/musics/recent", musicController.GetRecentMusicsController)
	group.GET("/music/genres", musicController.GetGenreListController)

	group.GET("/audio/:publicID", musicController.GetMusic)
    group.GET("/cover/:publicID", musicController.GetCoverImage)
}


