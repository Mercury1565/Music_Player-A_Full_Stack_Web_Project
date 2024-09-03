package interfaces

import "music_player_backend/domain/models"

type FileUploadService interface {
	SaveFile(filename string, data []byte) (string, *models.ErrorResponse)
	DeleteFile(filename string) *models.ErrorResponse
}