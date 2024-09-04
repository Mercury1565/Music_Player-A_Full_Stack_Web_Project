package middlewares

import (
	"net/http"

	"music_player_backend/domain/interfaces"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthMiddleware struct {
	JwtService  interfaces.JwtService
	sessionRepo interfaces.SessionRepository
}

func NewJwtAuthMiddleware(jwtService interfaces.JwtService, sessionRepo interfaces.SessionRepository) AuthMiddleware {
	return AuthMiddleware{
		JwtService:  jwtService,
		sessionRepo: sessionRepo,
	}
}

func (auth *AuthMiddleware) JWTAuthMiddelware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")

		auth_parts, err := auth.JwtService.ValidateAuthHeader(authHeader)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		tokenString := auth_parts[1]
		authorizedTokenJWT, err := auth.JwtService.ValidateToken(tokenString)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		objId, e := primitive.ObjectIDFromHex(authorizedTokenJWT.ID)
		if e != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		session, nErr := auth.sessionRepo.GetToken(c, objId)

		// access token is not in the session
		if nErr != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		// access token is not the same as the one in the session
		if session.AccessToken != tokenString {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		c.Set("id", authorizedTokenJWT.ID)
		c.Set("email", authorizedTokenJWT.Email)

		c.Next()
	}
}

func (auth *AuthMiddleware) JWTRefreshAuthMiddelware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.Request.Header.Get("Authorization")

		auth_parts, err := auth.JwtService.ValidateAuthHeader(authHeader)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		tokenString := auth_parts[1]
		authorizedTokenJWT, err := auth.JwtService.ValidateToken(tokenString)

		// access token is not valid
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		objId, e := primitive.ObjectIDFromHex(authorizedTokenJWT.ID)
		if e != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		_, nErr := auth.sessionRepo.GetToken(c, objId)

		// access token is not in the session
		if nErr != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		c.Set("id", authorizedTokenJWT.ID)
		c.Set("email", authorizedTokenJWT.Email)

		c.Next()
	}
}
