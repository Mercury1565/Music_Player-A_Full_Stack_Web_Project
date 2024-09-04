package controllers

import (
	"music_player_backend/domain/interfaces"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LogoutController struct {
	LogoutUsecase interfaces.LogoutUsecase
}

func NewLogoutController(logoutUsecase interfaces.LogoutUsecase, jwtService interfaces.JwtService) *LogoutController {
	return &LogoutController{
		LogoutUsecase: logoutUsecase,
	}
}

func (logoutController *LogoutController) Logout(ctx *gin.Context) {
	userId, err := primitive.ObjectIDFromHex(ctx.GetString("id"))
	if err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	e := logoutController.LogoutUsecase.LogoutUser(ctx, userId)
	if e != nil {
		ctx.IndentedJSON(e.Code, gin.H{"error": e.Message})
		return
	}

	ctx.IndentedJSON(http.StatusOK, gin.H{"message": "logged out successfully"})
}
