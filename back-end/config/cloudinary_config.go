package config

import (
	"music_player_backend/domain/models"

	"github.com/cloudinary/cloudinary-go"
)

func NewCloudinaryConfig(env *Env) (*cloudinary.Cloudinary, *models.ErrorResponse) {
	cld, err := cloudinary.NewFromParams(env.CLOUDINARY_CLOUD_NAME, env.CLOUDINARY_API_KEY, env.CLOUDINARY_API_SECRET)

	if err != nil {
		return nil, models.InternalServerError("cloudinary config failed")
	}

	return cld, nil

}
