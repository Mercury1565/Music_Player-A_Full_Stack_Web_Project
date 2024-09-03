package infrastructure

import (
	"fmt"
	"music_player_backend/config"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JwtService struct {
	Env *config.Env
}

func NewJwtService(env *config.Env) interfaces.JwtService {
	return &JwtService{
		Env: env,
	}
}

func (j *JwtService) CreateAccessToken(user models.User, expTim int) (accessToken string, err error) {
	expTime := time.Now().Add(time.Minute * time.Duration(expTim)).Unix()
	secret := []byte(j.Env.JWT_SECRET)

	claims := &models.JWTCustom{
		ID:    user.ID.Hex(),
		Email: user.Email,
		Role:  string(user.Role),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expTime,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, err := token.SignedString(secret)

	if err != nil {
		return "", err
	}

	return t, err
}

func (j *JwtService) CreateRefreshToken(user models.User, expTim int) (refreshToken string, err error) {
	expTime := time.Now().Add(time.Hour * time.Duration(expTim)).Unix()
	secret := []byte(j.Env.JWT_SECRET)

	claims := &models.JWTCustom{
		ID: user.ID.Hex(),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expTime,
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	refreshToken, err = token.SignedString(secret)

	if err != nil {
		return "", err
	}

	return refreshToken, nil
}

func (j *JwtService) ValidateToken(tokenStr string) (*models.JWTCustom, error) {
	jwtSecret := []byte(j.Env.JWT_SECRET)

	token, err := jwt.ParseWithClaims(tokenStr, &models.JWTCustom{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	claims, ok := token.Claims.(*models.JWTCustom)
	if !ok {
		return nil, fmt.Errorf("invalid JWT claims")
	}

	return claims, nil
}

func (j *JwtService) ValidateAuthHeader(authHeader string) ([]string, error) {
	if authHeader == "" {
		return nil, fmt.Errorf("authorization header is required")
	}

	authParts := strings.Split(authHeader, " ")
	if len(authParts) != 2 || strings.ToLower(authParts[0]) != "bearer" {
		return nil, fmt.Errorf("invalid authorization header")
	}

	return authParts, nil
}
