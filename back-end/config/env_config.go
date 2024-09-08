package config

import (
	"log"

	"github.com/spf13/viper"
)

type Env struct {
	JWT_SECRET string `mapstructure:"JWT_SECRET"`

	DB_USERNAME string `mapstructure:"DB_USERNAME"`
	DB_PASSWORD string `mapstructure:"DB_PASSWORD"`
	DB_NAME     string `mapstructure:"DB_NAME"`

	ACCESS_TOKEN_EXPIRY_HOUR  int `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	REFRESH_TOKEN_EXPIRY_HOUR int `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`

	SERVER_ADDRESS  string `mapstructure:"SERVER_ADDRESS"`
	CONTEXT_TIMEOUT int    `mapstructure:"CONTEXT_TIMEOUT"`
}

func NewEnv() *Env {
    viper.AutomaticEnv()

    // Bind environment variables
    viper.BindEnv("JWT_SECRET")
    viper.BindEnv("DB_USERNAME")
    viper.BindEnv("DB_PASSWORD")
    viper.BindEnv("DB_NAME")
    viper.BindEnv("ACCESS_TOKEN_EXPIRY_HOUR")
    viper.BindEnv("REFRESH_TOKEN_EXPIRY_HOUR")
    viper.BindEnv("SERVER_ADDRESS")
    viper.BindEnv("CONTEXT_TIMEOUT")

    env := Env{}

    if err := viper.Unmarshal(&env); err != nil {
        log.Fatalf("Error unmarshaling environment variables: %v", err)
    }

    return &env
}
