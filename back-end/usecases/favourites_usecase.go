package usecases

import (
	"context"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type favouriteUsecase struct {
	userRepository interfaces.UserRepository
	timeout        time.Duration
}

func NewFavouriteUsecase(userRepo interfaces.UserRepository, timeout time.Duration) interfaces.FavouriteUsecase {
	return &favouriteUsecase{
		userRepository: userRepo,
		timeout: timeout,
	}
}

func (uc *favouriteUsecase) AddFavouriteMusic(ctx context.Context, userID, musicID primitive.ObjectID) *models.ErrorResponse {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.userRepository.AddFavouriteMusic(ctx, userID, musicID)
}

func (uc *favouriteUsecase) RemoveFavouriteMusic(ctx context.Context, userID, musicID primitive.ObjectID) *models.ErrorResponse {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.userRepository.RemoveFavouriteMusic(ctx, userID, musicID)
}

func (uc *favouriteUsecase) GetUserFavouriteMusics(ctx context.Context, userID primitive.ObjectID) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.userRepository.GetUserFavouriteMusics(ctx, userID)
}
