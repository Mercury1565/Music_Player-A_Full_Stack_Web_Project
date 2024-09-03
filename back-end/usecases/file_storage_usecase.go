package usecases

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"music_player_backend/domain/models"
	"music_player_backend/infrastructure"
	"path/filepath"
	"strings"
)

type MusicUsecase struct {
	storage *infrastructure.FileStorage
}

func NewFileStorageUsecase(storage *infrastructure.FileStorage) *MusicUsecase {
	return &MusicUsecase{storage: storage}
}

func (uc *MusicUsecase) UploadFile(ctx context.Context, file *multipart.FileHeader, directory, artist, title string) (string, *models.ErrorResponse) {
	// Open the uploaded file
	src, err := file.Open()
	if err != nil {
		return "", models.InternalServerError("Failed to open file.")
	}
	defer src.Close()

	// Read the file data
	data, err := io.ReadAll(src)
	if err != nil {
		return "", models.InternalServerError("Failed to read file.")
	}

	// Generate the filename in the format [Artist-Title].extension
	extension := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%s-%s%s", strings.ReplaceAll(artist, " ", "_"), strings.ReplaceAll(title, " ", "_"), extension)

	// Save the file in the specified directory
	return uc.storage.SaveFile(directory, filename, data)
}


func (uc *MusicUsecase) DeleteMusic(ctx context.Context, artist, title string) *models.ErrorResponse {
    // Generate the filenames for the music and cover image
    musicFilename := fmt.Sprintf("%s-%s.mp3", strings.ReplaceAll(artist, " ", "_"), strings.ReplaceAll(title, " ", "_"))
    coverFilename := fmt.Sprintf("%s-%s.jpg", strings.ReplaceAll(artist, " ", "_"), strings.ReplaceAll(title, " ", "_"))

    // Construct the full file paths
    musicPath := filepath.Join(uc.storage.UploadDir, "music", musicFilename)
    coverPath := filepath.Join(uc.storage.UploadDir, "cover", coverFilename)

    // Delete the music file
    if err := uc.storage.DeleteFile(musicPath); err != nil {
        return err
    }

    // Delete the cover image file
    if err := uc.storage.DeleteFile(coverPath); err != nil {
        return err
    }

    return nil
}