package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type refreshUsecase struct {
	jwtService        interfaces.JwtService
	userRepository    interfaces.UserRepository
	sessionRepository interfaces.SessionRepository
}

func NewRefreshUsecase(jwtService interfaces.JwtService, userRepo interfaces.UserRepository, sessionRepo interfaces.SessionRepository) interfaces.RefreshUsecase {
	return &refreshUsecase{
		jwtService:        jwtService,
		userRepository:    userRepo,
		sessionRepository: sessionRepo,
	}
}

func (uc *refreshUsecase) RefreshToken(ctx context.Context, userID primitive.ObjectID, refreshToken string, expiry int) (string, *models.ErrorResponse) {
	user, err := uc.userRepository.GetUserByID(ctx, userID)
	if err != nil {
		return "", err
	}

	accessToken, tErr := uc.jwtService.CreateAccessToken(*user, expiry)
	if tErr != nil {
		return "", models.InternalServerError("An unexpected error occurred")
	}

	newSession := models.Session{
		UserID:       userID,
		RefreshToken: refreshToken,
		AccessToken:  accessToken,
	}

	// remove old session
	err = uc.sessionRepository.RemoveToken(ctx, userID) 
	if err != nil {
		return "", err
	}

	// create new session
	err = uc.sessionRepository.SaveToken(ctx, &newSession)
	if err != nil {
		return "", err
	}

	return accessToken, err
}
