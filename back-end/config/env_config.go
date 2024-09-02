package config

import (
	"log"
	"path/filepath"

	"github.com/spf13/viper"
)

type Env struct {
	JWT_SECRET string `mapstructure:"JWT_SECRET"`

	DB_HOST string `mapstructure:"DB_HOST"`
	DB_PORT string `mapstructure:"DB_PORT"`
	DB_NAME string `mapstructure:"DB_NAME"`

	ACCESS_TOKEN_EXPIRY_HOUR  int `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	REFRESH_TOKEN_EXPIRY_HOUR int `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`

	SERVER_ADDRESS  string `mapstructure:"SERVER_ADDRESS"`
	CONTEXT_TIMEOUT int    `mapstructure:"CONTEXT_TIMEOUT"`

	OAUTH_CLIENT_ID       string `mapstructure:"OAUTH_CLIENT_ID"`
	OAUTH_CLIENT_SECRET   string `mapstructure:"OAUTH_CLIENT_SECRET"`
	OAUTH_REDIRECT_URL    string `mapstructure:"OAUTH_REDIRECT_URL"`
	GOOGEL_CLIENT_ID      string `mapstructure:"GOOGEL_CLIENT_ID"`
	GOOGLE_TOKEN_INFO_URL string `mapstructure:"GOOGLE_TOKEN_INFO_URL"`

	CLOUDINARY_CLOUD_NAME string `mapstructure:"CLOUDINARY_CLOUD_NAME"`
	CLOUDINARY_API_KEY    string `mapstructure:"CLOUDINARY_API_KEY"`
	CLOUDINARY_API_SECRET string `mapstructure:"CLOUDINARY_API_SECRET"`
}

func NewEnv() *Env {
	projectRoot, err := filepath.Abs(filepath.Join("/home/mercury/Desktop/a2sv_starter_project/a2sv-g5-project-phase-starter-project/backend/AAiT-backend-group-5/"))

	if err != nil {
		log.Fatalf("Error getting project root path: %v", err)
	}

	// Set the path to the .env file
	viper.SetConfigFile(filepath.Join(projectRoot, ".env"))

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Error reading .env file: %v", err)
	}
	viper.BindEnv("JWT_SECRET")

	viper.BindEnv("MONGO_URI")
	viper.BindEnv("DB_NAME")

	viper.BindEnv("SERVER_ADDRESS")
	viper.BindEnv("CONTEXT_TIMEOUT")

	viper.BindEnv("ACCESS_TOKEN_EXPIRY_HOUR")
	viper.BindEnv("REFRESH_TOKEN_EXPIRY_HOUR")

	viper.BindEnv("OAUTH_CLIENT_ID")
	viper.BindEnv("OAUTH_CLIENT_SECRET")
	viper.BindEnv("OAUTH_REDIRECT_URL")
	viper.BindEnv("GOOGLE_CLIENT_ID")
	viper.BindEnv("GOOGLE_TOKEN_INFO_URL")

	viper.BindEnv("CLOUDINARY_CLOUD_NAME")
	viper.BindEnv("CLOUDINARY_API_KEY")
	viper.BindEnv("CLOUDINARY_API_SECRET")

	env := Env{}

	if err := viper.Unmarshal(&env); err != nil {
		log.Fatalf("Error unmarshaling environment variables: %v", err)
	}

	return &env
}
