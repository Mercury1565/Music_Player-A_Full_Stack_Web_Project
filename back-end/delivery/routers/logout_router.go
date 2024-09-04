package routers

import (
	"music_player_backend/config"
	"music_player_backend/delivery/controllers"
	"music_player_backend/infrastructure"
	"music_player_backend/repository"
	"music_player_backend/usecases"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewLogoutRouter(env *config.Env, database mongo.Database, group *gin.RouterGroup) {

	session_repository := repository.NewSessionRepository(database, "sessions")
	jwt_service := infrastructure.NewJwtService(env)

	LogoutController := &controllers.LogoutController{
		LogoutUsecase: usecases.NewLogoutUsecase(jwt_service, session_repository),
	}

	group.POST("/logout", LogoutController.Logout)
}
