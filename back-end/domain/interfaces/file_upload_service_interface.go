package interfaces

import "music_player_backend/domain/models"

type FileUploadService interface {
	SaveFile(directory, filename string, data []byte) (string, *models.ErrorResponse)
	DeleteFile(musicFilename, coverFilename string) *models.ErrorResponse
}