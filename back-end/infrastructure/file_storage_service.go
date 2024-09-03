package infrastructure

import (
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"os"
	"path/filepath"
)

type FileStorage struct {
	UploadDir string
}

func NewFileStorage(uploadDir string) interfaces.FileUploadService {
	return &FileStorage{UploadDir: uploadDir}
}

func (fs *FileStorage) SaveFile(directory, filename string, data []byte) (string, *models.ErrorResponse) {
	dirPath := filepath.Join(fs.UploadDir, directory)
    if err := os.MkdirAll(dirPath, os.ModePerm); err != nil {
        return "", models.InternalServerError("Failed to create directory.")
    }

    filePath := filepath.Join(dirPath, filename)
    if err := os.WriteFile(filePath, data, 0666); err != nil {
        return "", models.InternalServerError("Failed to save file.")
    }
    return filePath, nil
}

func (fs *FileStorage) DeleteFile(filePath string) *models.ErrorResponse {
    if err := os.Remove(filePath); err != nil {
        return models.InternalServerError("Failed to delete file.")
    }
    return nil
}