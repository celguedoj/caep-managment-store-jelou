# 🏪 CAEP Management Store (Jelou)

Proyecto desarrollado por Carlos Elguedo, que implementa una arquitectura de microservicios para la gestión de clientes y órdenes,
orquestada por una función **AWS Lambda**.

---

## 🚀 Descripción general

El sistema está compuesto por tres servicios principales:

| Servicio | Descripción | Puerto |
|-----------|--------------|--------|
| **customers-api** | CRUD de clientes, autenticación JWT y validaciones. | `3001` |
| **orders-api** | Gestión de órdenes, ítems e idempotencia. | `3002` |
| **lambda-orchestrator** | Lambda orquestador que integra ambos servicios. | `3003`

Base de datos: **MySQL 8.0**, gestionada vía Docker.

---

## ⚙️ Requisitos previos

- Docker y Docker Compose
- Node.js >= 20.x
- (Opcional) AWS SAM CLI (para simular Lambda)

---

## 🧱 Estructura del repositorio

```
caep-managment-store-jelou/
├── customers-api/
│   ├── src/
│   ├── Dockerfile
│   └── .env.example
├── orders-api/
│   ├── src/
│   ├── Dockerfile
│   └── .env.example
├── lambda-orchestrator/
│   ├── handler.js
│   ├── src/
│   ├── Dockerfile
│   ├── template.yaml
│   └── README.md
├── db/
│   ├── schema.sql
│   └── seed.sql
├── docker-compose.yml
└── README.md
```

---

## 🐳 Comandos principales

### Levantar todo el entorno (base de datos + microservicios)
```bash
docker-compose up --build
```

### Ver logs de un servicio
```bash
docker logs -f customers-api
docker logs -f orders-api
docker logs -f mysql-db
```

### Conectarse al MySQL (dentro del contenedor)
```bash
docker exec -it mysql-db mysql -uroot -proot jeloudb
```


---

## 🔐 Autenticación

Los endpoints protegidos usan **JWT**.  
El servicio `lambda-orchestrator` se autentica con el token configurado en `SERVICE_JWT_TOKEN`.

Ejemplo de header:
```
Authorization: Bearer token
```

---

## 🧪 Ejemplos de Requests

### 1️⃣ Crear un cliente
```bash
curl -X POST http://localhost:3001/customers   -H "Authorization: Bearer service-token"   -H "Content-Type: application/json"   -d '{"name":"Carlos Elguedo","email":"carlos@email.com","phone":"3001234567"}'
```

### 2️⃣ Listar clientes
```bash
curl -H "Authorization: Bearer service-token" http://localhost:3001/customers
```

### 3️⃣ Crear orden
```bash
curl -X POST http://localhost:3002/orders   -H "Authorization: Bearer service-token"   -H "Content-Type: application/json"   -d '{"customer_id":1,"items":[{"product_id":2,"qty":3}]}'
```

### 4️⃣ Confirmar orden (idempotente)
```bash
curl -X POST http://localhost:3002/orders/1/confirm   -H "Authorization: Bearer service-token"   -H "X-Idempotency-Key: abc-123"
```

### 5️⃣ Orquestar creación y confirmación desde Lambda
```bash
curl -X POST http://localhost:3003/orchestrator/create-and-confirm-order   -H "Content-Type: application/json"   -d '{"customer_id":1,"items":[{"product_id":2,"qty":3}],"idempotency_key":"abc-123","correlation_id":"req-789"}'
```

---

## ☁️ Ejecución de Lambda

### 🧰 Opción 1: Simular con AWS SAM (recomendada)
```bash
cd lambda-orchestrator
sam build
sam local start-api --docker-network caep-managment-store-jelou_default
```
Endpoint local:
```
http://127.0.0.1:3000/orchestrator/create-and-confirm-order
```

### 🚀 Opción 2: Deploy en AWS
```bash
cd lambda-orchestrator
sam build
sam deploy --guided
```

---

## 📦 Ejemplo de respuesta de Lambda

```json
{
  "success": true,
  "correlationId": "req-789",
  "data": {
    "customer": {
      "id": 1,
      "name": "ACME",
      "email": "ops@acme.com",
      "phone": "3001234567"
    },
    "order": {
      "id": 101,
      "status": "CONFIRMED",
      "total_cents": 459900,
      "items": [
        {
          "product_id": 2,
          "qty": 3,
          "unit_price_cents": 129900,
          "subtotal_cents": 389700
        }
      ]
    }
  }
}
```

---

## 🧩 Tecnologías principales

- **Node.js 20**  
- **Express.js**  
- **MySQL 8.0**  
- **AWS Lambda (SAM CLI)**  
- **Docker & Docker Compose**  
- **JWT Authentication**
- **Clean Architecture / Hexagonal Pattern**

---

## ✨ Autor

**Carlos Elguedo**  
📧 [carlos.elguedo@gmail.com](mailto:carlos.elguedo@gmail.com)  
🔗 [GitHub: celguedoj](https://github.com/celguedoj)

---

> 💡 Repositorio oficial: [https://github.com/celguedoj/caep-managment-store-jelou](https://github.com/celguedoj/caep-managment-store-jelou)
