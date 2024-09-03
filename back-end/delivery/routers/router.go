package routers

import (
	"music_player_backend/config"
	"music_player_backend/delivery/middlewares"
	"music_player_backend/infrastructure"
	"music_player_backend/repository"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Setup(env *config.Env, db mongo.Database, gin *gin.Engine) {
	jwt_service := infrastructure.NewJwtService(env)
	session_repo := repository.NewSessionRepository(db, "sessions")
	jwtMiddleware := middlewares.NewJwtAuthMiddleware(jwt_service, session_repo)

	publicRoute := gin.Group("")
	protectedRoute := gin.Group("")
	refreshRoute := publicRoute.Group("")

	refreshRoute.Use(jwtMiddleware.JWTRefreshAuthMiddelware())
	protectedRoute.Use(jwtMiddleware.JWTAuthMiddelware())

	NewMusicRouter(env, db, protectedRoute)
	NewLogoutRouter(env, db, protectedRoute)
	NewFavouritesRouter(env, db, protectedRoute)

	NewAuthenticationRouter(env, db, publicRoute)
	NewRefreshRouter(env, db, refreshRoute)
}


