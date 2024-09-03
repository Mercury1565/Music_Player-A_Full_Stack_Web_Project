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

func NewRefreshRouter(env *config.Env, database mongo.Database, group *gin.RouterGroup) {

	user_repository := repository.NewUserRepo(database, "users")
	session_repository := repository.NewSessionRepository(database, "sessions")
	jwt_service := infrastructure.NewJwtService(env)

	RefreshController := &controllers.RefreshController{
		RefreshUsecase: usecases.NewRefreshUsecase(jwt_service, user_repository, session_repository),	
		JwtService:     jwt_service,
		Env:            env,
	}

	group.GET("/refresh", RefreshController.Refresh)
}
