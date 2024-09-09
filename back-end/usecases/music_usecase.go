package usecases

import (
	"context"
	"mime/multipart"
	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"
	"music_player_backend/domain/models"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type musicUsecase struct {
	// Add any dependencies or fields needed for the usecase
	musicRepo  interfaces.MusicRepository
	cloudinary interfaces.CloudinaryInterface
	timeout    time.Duration
}

func NewMusicUsecase(repo interfaces.MusicRepository, cloudinary interfaces.CloudinaryInterface, timeout time.Duration) interfaces.MusicUsecase {
	return &musicUsecase{
		musicRepo:  repo,
		cloudinary: cloudinary,
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
	music.ArtistID = newMusic.ArtistID
	music.Title = newMusic.Title
	music.Genres = newMusic.Genres

	// Upload the audio file to cloudinary
	audioPublicID, err := uc.cloudinary.UploadAudio(audioFile, ctx)
	if err != nil {
		return nil, err
	}

	// Upload the cover image to cloudinary
	coverPublicID, err := uc.cloudinary.UploadCover(*coverImage, ctx)
	if err != nil {
		return nil, err
	}

	music.AudioFilePath = audioPublicID
	music.CoverImagePath = coverPublicID

	return uc.musicRepo.CreateMusic(ctx, &music)
}

func (uc *musicUsecase) GetMusic(ctx context.Context, id primitive.ObjectID) (*models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.GetMusic(ctx, id)
}

func (uc *musicUsecase) GetMusics(ctx context.Context) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.GetMusics(ctx)
}

func (uc *musicUsecase) GetMusicByArtistID(ctx context.Context, artistID primitive.ObjectID) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.GetMusicByArtistID(ctx, artistID)
}

func (uc *musicUsecase) GetTopMusics(ctx context.Context, limit int) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.GetTopMusics(ctx, limit)
}

func (uc *musicUsecase) GetRecentMusics(ctx context.Context, limit int) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.GetRecentMusics(ctx, limit)
}

func (uc *musicUsecase) SearchMusics(ctx context.Context, filter dtos.FilterMusicRequest) ([]models.Music, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()
	return uc.musicRepo.SearchMusics(ctx, filter)
}

func (uc *musicUsecase) GetGenreList(ctx context.Context) ([]models.Genre, *models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()
	return uc.musicRepo.GetGenreList(ctx)
}

func (uc *musicUsecase) DeleteMusic(ctx context.Context, deleteMusicReq dtos.DeleteMusicRequest) *models.ErrorResponse {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	// check if delete operation is authorized
	music, err := uc.musicRepo.GetMusic(ctx, deleteMusicReq.MusicID)
	if err != nil {
		return err
	}

	if music.ArtistID != deleteMusicReq.ArtistID {
		return models.Unauthorized("You are not authorized to delete this music")
	}

	// delete the music and cover image files from cloudinary
	uc.cloudinary.DeleteFile(music.AudioFilePath, ctx)
	uc.cloudinary.DeleteFile(music.CoverImagePath, ctx)

	return uc.musicRepo.DeleteMusic(ctx, deleteMusicReq.MusicID)
}

func (uc *musicUsecase) IncreasePlayCount(ctx context.Context, id string) (*models.ErrorResponse) {
	ctx, cancel := context.WithTimeout(ctx, uc.timeout)
	defer cancel()

	return uc.musicRepo.IncreasePlayCount(ctx, id)
}