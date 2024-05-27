from fastapi import FastAPI, HTTPException
from app.database.database import engine, Base, async_session
from fastapi.middleware.cors import CORSMiddleware
from app.routes import api_router
from app.model.models import CatFact
from app.model.crud import get_all_cat_facts

import requests

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:3000",  # React local
    "http://127.0.0.1:3000",  # Otra posible URL local
    # Agrega más orígenes si es necesario
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Puedes restringir esto a métodos específicos como ["GET", "POST"]
    allow_headers=["*"],  # Puedes restringir esto a headers específicos como ["Content-Type"]
)

# Create the database tables
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Obtener los cat facts de la API y guardarlos en la base de datos
    try:
        response = requests.get("https://catfact.ninja/facts")
        response.raise_for_status()  # Lanzará una excepción si la solicitud no tiene éxito

        cat_facts_data = response.json().get("data", [])
        async with async_session() as session:
            
            cat_facts = await get_all_cat_facts(session)
            if cat_facts:
                # Si ya hay cat facts en la base de datos, no es necesario hacer nada más
                return

            for cat_fact in cat_facts_data:
                db_cat_fact = CatFact(fact=cat_fact["fact"])
                session.add(db_cat_fact)
            await session.commit()
    except Exception as e:
        # Manejar cualquier error que ocurra al obtener los cat facts o al guardarlos en la base de datos
        raise HTTPException(status_code=500, detail=f"Error al obtener/guardar los cat facts: {str(e)}")

app.include_router(api_router)