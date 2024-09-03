package interfaces

import (
	"music_player_backend/domain/models"
)

type JwtService interface {
	CreateAccessToken(user models.User, expTime int) (accessToken string, err error)
	CreateRefreshToken(user models.User, expTime int) (refreshToken string, err error)
	ValidateToken(tokenStr string) (*models.JWTCustom, error)
	ValidateAuthHeader(authHeader string) ([]string, error)
	// CreateURLToken(user models.User, expTime int) (accessToken string, err error)
	// ValidateURLToken(tokenStr string) (*models.URLTokenCustom, error)
}
