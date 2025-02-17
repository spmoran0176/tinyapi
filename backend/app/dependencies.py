from azure.identity import DefaultAzureCredential

def get_azure_credentials():
    return DefaultAzureCredential()
