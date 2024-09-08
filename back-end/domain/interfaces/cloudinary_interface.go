package interfaces

import (
	"context"
	"mime/multipart"
	"music_player_backend/domain/models"
)

type CloudinaryInterface interface {
	UploadCover(file multipart.FileHeader, ctx context.Context) (string, *models.ErrorResponse)
	UploadAudio(file *multipart.FileHeader, ctx context.Context) (string, *models.ErrorResponse)
	DeleteFile(publicID string, ctx context.Context) *models.ErrorResponse
	GetCoverURL(publicID string) string
	GetAudioURL(publicID string) string
}
