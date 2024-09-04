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
}

func NewEnv() *Env {
	projectRoot, err := filepath.Abs(filepath.Join("/home/mercury/Desktop/Addis_Project/back-end/"))

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

	env := Env{}

	if err := viper.Unmarshal(&env); err != nil {
		log.Fatalf("Error unmarshaling environment variables: %v", err)
	}

	return &env
}
