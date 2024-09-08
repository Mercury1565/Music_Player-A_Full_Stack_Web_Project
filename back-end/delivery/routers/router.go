package routers

import (
	"music_player_backend/config"
	"music_player_backend/delivery/middlewares"
	"music_player_backend/infrastructure"
	"music_player_backend/repository"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Setup(env *config.Env, db mongo.Database, gin *gin.Engine) {
	jwt_service := infrastructure.NewJwtService(env)
	session_repo := repository.NewSessionRepository(db, "sessions")
	jwtMiddleware := middlewares.NewJwtAuthMiddleware(jwt_service, session_repo)

	gin.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"https://music-player-a-full-stack-web-project.vercel.app/"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length", "Content-Type"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	publicRoute := gin.Group("")
	protectedRoute := gin.Group("")
	refreshRoute := gin.Group("")

	refreshRoute.Use(jwtMiddleware.JWTRefreshAuthMiddelware())
	protectedRoute.Use(jwtMiddleware.JWTAuthMiddelware())

	NewMusicRouter(env, db, protectedRoute)
	NewLogoutRouter(env, db, protectedRoute)
	NewFavouritesRouter(env, db, protectedRoute)

	NewAuthenticationRouter(env, db, publicRoute)
	NewRefreshRouter(env, db, refreshRoute)
}
