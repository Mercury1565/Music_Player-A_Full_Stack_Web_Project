package usecases

import (
	"context"
	"fmt"
	"io"
	"mime/multipart"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"path/filepath"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type musicUsecase struct {
	// Add any dependencies or fields needed for the usecase
	repository interfaces.MusicRepository
	storage    interfaces.FileUploadService
	timeout    time.Duration
}

func NewMusicUsecase(repo interfaces.MusicRepository, storage interfaces.FileUploadService, timeout time.Duration) interfaces.MusicUsecase {
	return &musicUsecase{
		repository: repo,
		storage:    storage,
		timeout:    timeout,
	}
}

func (uc *musicUsecase) CreateMusic(ctx context.Context, newMusic *dtos.CreateMusicRequest, audioFile *multipart.FileHeader, coverImage *multipart.FileHeader) (*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	var music models.Music

	if newMusic.Artist == "" || newMusic.Title == "" {
		return nil, models.BadRequest("Artist and Title are required fields.")
	}

	music.Artist = newMusic.Artist
	music.Title = newMusic.Title
	music.Genres = newMusic.Genres

	// upload the audio file and cover image
	audioFilePath, err := uc.uploadFile(audioFile, "music", music.Artist, music.Title)
	if err != nil {
		return nil, err
	}

	coverImageFilePath, err := uc.uploadFile(coverImage, "cover", music.Artist, music.Title)
	if err != nil {
		return nil, err
	}

	music.AudioFilePath = audioFilePath
	music.CoverImagePath = coverImageFilePath

	return uc.repository.CreateMusic(ctx, &music)
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

	// check if delete operation is authorized
	music, err := uc.repository.GetMusic(ctx, deleteMusicReq.MusicID)
	if err != nil {
		return err
	}

	if music.ArtistID != deleteMusicReq.ArtistID {
		return models.Unauthorized("You are not authorized to delete this music")
	}

	// delete the music and cover image files
	if err := uc.deleteFile(music.Artist, music.Title); err != nil {
		return err
	}

	return uc.repository.DeleteMusic(ctx, deleteMusicReq.MusicID)
}

// The below two don't get exported

func (uc *musicUsecase) uploadFile(file *multipart.FileHeader, directory, artist, title string) (string, *models.ErrorResponse) {
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

func (uc *musicUsecase) deleteFile(artist, title string) *models.ErrorResponse {
	// Generate the filenames for the music and cover image
	musicFilename := fmt.Sprintf("%s-%s.mp3", strings.ReplaceAll(artist, " ", "_"), strings.ReplaceAll(title, " ", "_"))
	coverFilename := fmt.Sprintf("%s-%s.jpg", strings.ReplaceAll(artist, " ", "_"), strings.ReplaceAll(title, " ", "_"))

	return uc.storage.DeleteFile(musicFilename, coverFilename)
}
