from typing import List
from pydantic import BaseModel


class User(BaseModel):
    name: str
    given_name: str
    email: str
    id: str
    tenant_id: str
    groups: List[str]
    ipaddr: str
