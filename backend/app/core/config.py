from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import SecretStr
from typing import List


class Settings(BaseSettings):
    app_env: str
    azure_client_id: str
    azure_tenant_id: str
    azure_client_cert_path: str
    admin_group_id: str
    api_audience: str
    entra_instance: str
    origin: str

    model_config = SettingsConfigDict(
        env_file = ".env"
        )
        

settings = Settings()
