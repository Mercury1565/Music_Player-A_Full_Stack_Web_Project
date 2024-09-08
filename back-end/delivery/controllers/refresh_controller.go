package controllers

import (
	"net/http"

	"music_player_backend/config"
	"music_player_backend/domain/interfaces"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RefreshController struct {
	RefreshUsecase interfaces.RefreshUsecase
	JwtService     interfaces.JwtService
	Env            *config.Env
}

func NewRefreshController(refreshUsecase interfaces.RefreshUsecase, jwtService interfaces.JwtService, env *config.Env) *RefreshController {
	return &RefreshController{
		RefreshUsecase: refreshUsecase,
		JwtService:     jwtService,
		Env:            env,
	}
}

func (refreshController *RefreshController) Refresh(ctx *gin.Context) {
	userId, er := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if er != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	authHeader := ctx.GetHeader("Authorization")
	authParts, err := refreshController.JwtService.ValidateAuthHeader(authHeader)

	if err != nil {
		ctx.JSON(http.StatusUnauthorized, err.Error())
		return
	}

	refresh_token := authParts[1]
	timeout := refreshController.Env.REFRESH_TOKEN_EXPIRY_HOUR
	accessToken, e := refreshController.RefreshUsecase.RefreshToken(ctx.Request.Context(), userId, refresh_token, timeout)
	if e != nil {
		ctx.IndentedJSON(e.Code, gin.H{"error": e.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"access_token": accessToken})
}
