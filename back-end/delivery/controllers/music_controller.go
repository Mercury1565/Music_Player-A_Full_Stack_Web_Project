package controllers

import (
	"mime/multipart"
	"net/http"
	"strconv"
	"strings"
	"time"

	"music_player_backend/domain/dtos"
	"music_player_backend/domain/interfaces"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MusicController struct {
	usecase interfaces.MusicUsecase
}

func NewMusicController(usecase interfaces.MusicUsecase) *MusicController {
	return &MusicController{
		usecase: usecase,
	}
}

func (musicController *MusicController) CreateMusicController(ctx *gin.Context) {
	var newMusic dtos.CreateMusicRequest
	artistId := ctx.GetString("id")
	validate := validator.New()

	audioFile, err := ctx.FormFile("music")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Audio file is missing"})
		return
	}

	coverImage, err := ctx.FormFile("cover_image")
	if err != nil {
		coverImage = &multipart.FileHeader{}
	}

	newMusic.Artist = ctx.PostForm("artist")
	newMusic.ArtistID, _ = primitive.ObjectIDFromHex(artistId)
	newMusic.Title = ctx.PostForm("title")
	newMusic.Genres = strings.Split(ctx.PostForm("genres"), ",")

	if err := validate.Struct(newMusic); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "One or more fields are missing"})
		return
	}

	music, e := musicController.usecase.CreateMusic(ctx, &newMusic, audioFile, coverImage)
	if e != nil {
		ctx.JSON(e.Code, gin.H{"error": e.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"music": music, "message": "new music added sucessfully"})
}

func (musicController *MusicController) GetMusicController(ctx *gin.Context) {
	musicId, e := primitive.ObjectIDFromHex(ctx.Param("id"))
	if e != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}

	music, err := musicController.usecase.GetMusic(ctx, musicId)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	musicPath := music.AudioFilePath
	coverImagePath := music.CoverImagePath

	ctx.IndentedJSON(http.StatusOK, gin.H{
		"music":            music,
		"music_path":       musicPath,
		"cover_image_path": coverImagePath,
	})
}

func (musicController *MusicController) GetMusicsController(ctx *gin.Context) {
	musics, err := musicController.usecase.GetMusics(ctx)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"musics": musics})
}

func (musicController *MusicController) SearchMusicsController(ctx *gin.Context) {

	title := ctx.DefaultQuery("title", "")
	artist := ctx.DefaultQuery("artist", "")
	date := ctx.DefaultQuery("date", "")
	playCount := ctx.DefaultQuery("view_count", "-1")
	genres := ctx.DefaultQuery("genres", "")

	playCountInt, _ := strconv.Atoi(playCount)
	dateTime, _ := time.Parse("2000-01-02", date)

	genresSlice := []string{}
	if genres != "" {
		genresSlice = strings.Split(genres, ",")
	}

	filter := dtos.FilterMusicRequest{
		Title:     title,
		Artist:    artist,
		Date:      dateTime,
		PlayCount: playCountInt,
		Genres:    genresSlice,
	}

	musics, err := musicController.usecase.SearchMusics(ctx, filter)
	if err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"data": musics})
}

func (musicController *MusicController) DeleteMusicController(ctx *gin.Context) {
	validate := validator.New()

	musicID, e := primitive.ObjectIDFromHex(ctx.Param("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid music id"})
		return
	}
	artistID, e := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if e != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "Invalid artist id"})
		return
	}

	deleteMusicReq := dtos.DeleteMusicRequest{
		MusicID:  musicID,
		ArtistID: artistID,
	}

	if err := validate.Struct(deleteMusicReq); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "One or more fields are missing"})
		return
	}

	if err := musicController.usecase.DeleteMusic(ctx, deleteMusicReq); err != nil {
		ctx.IndentedJSON(err.Code, gin.H{"error": err.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "Music deleted successfully"})
}
