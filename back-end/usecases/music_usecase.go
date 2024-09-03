package usecases

import (
	"context"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type musicUsecase struct {
	// Add any dependencies or fields needed for the usecase
	repository     interfaces.MusicRepository
	timeout time.Duration
}

func NewMusicUsecase(repo interfaces.MusicRepository, timeout time.Duration) interfaces.MusicUsecase {
	return &musicUsecase{
		repository: repo,
		timeout: timeout,
	}
}

func (uc *musicUsecase) CreateMusic(ctx context.Context, music *models.Music) (*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()
	
	return uc.repository.CreateMusic(ctx, music)
}

func (uc *musicUsecase) GetMusic(ctx context.Context, id primitive.ObjectID) (*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()
	
	uc.repository.IncreasePlayCount(ctx, id)
	return uc.repository.GetMusic(ctx, id)
}

func (uc *musicUsecase) GetMusics(ctx context.Context) ([]*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.repository.GetMusics(ctx)
}

func (uc *musicUsecase) SearchMusics(ctx context.Context, filter dtos.FilterMusicRequest) ([]*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()
	return uc.repository.SearchMusics(ctx, filter)
}

func (uc *musicUsecase) DeleteMusic(ctx context.Context, deleteMusicReq dtos.DeleteMusicRequest) *models.ErrorResponse {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.repository.DeleteMusic(ctx, deleteMusicReq.MusicID)
}
