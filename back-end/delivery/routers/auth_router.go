package routers

import (
	"log"
	"music_player_backend/delivery/controllers"

	"music_player_backend/config"
	"music_player_backend/infrastructure"
	"music_player_backend/repository"
	"music_player_backend/usecases"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func NewAuthenticationRouter(env *config.Env, database mongo.Database, group *gin.RouterGroup) {

	user_repository := repository.NewUserRepo(database, "users", "music")
	session_repository := repository.NewSessionRepository(database, "sessions")

	jwt_service := infrastructure.NewJwtService(env)
	password_service := infrastructure.NewPasswordService()

	LoginController := &controllers.LoginController{
		LoginUsecase: usecases.NewLoginUsecase(jwt_service, password_service, user_repository, session_repository, *env),
		Env:          env,
	}

	SignupController := &controllers.SignupController{
		SignupUsecase: usecases.NewSignupUsecase(user_repository, password_service),
	}

	// TEST ROUTE
	group.GET("/", func(ctx *gin.Context) {
		log.Println("Hello there")
	})

	group.POST("/signup", SignupController.Signup)
	group.POST("/login", LoginController.Login)
}
