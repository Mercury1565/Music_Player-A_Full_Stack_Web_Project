package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type logoutUsecase struct {
	jwtService interfaces.JwtService
	sessionRepo interfaces.SessionRepository
}

func NewLogoutUsecase(jwtService interfaces.JwtService, sessionRepo interfaces.SessionRepository) interfaces.LogoutUsecase {
	return &logoutUsecase{
		jwtService: jwtService,
		sessionRepo: sessionRepo,
	}
}

func (uc *logoutUsecase) LogoutUser(ctx context.Context, userID primitive.ObjectID) *models.ErrorResponse {

	if err := uc.sessionRepo.RemoveToken(ctx, userID); err != nil {
		return models.InternalServerError("Error removing user token")
	}

	return nil
}
