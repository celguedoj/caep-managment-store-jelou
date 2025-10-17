# Lambda Orchestrator

Esta función Lambda actúa como un **orquestador** que coordina las llamadas entre los microservicios `customers-api` y `orders-api`.

---

## 🚀 Descripción

Endpoint:  
`POST /orchestrator/create-and-confirm-order`

### Flujo
1. **Valida cliente** → Llama al endpoint interno de `customers-api` (`/internal/customers/:id`).
2. **Crea orden** → Llama a `orders-api` (`/orders`).
3. **Confirma orden** → Llama a `orders-api` (`/orders/:id/confirm`) con `X-Idempotency-Key`.
4. **Retorna** el resultado consolidado: cliente + orden confirmada + ítems.

---

## ⚙️ Variables de entorno

| Variable | Descripción |
|-----------|--------------|
| `CUSTOMERS_API_URL` | URL base del servicio de clientes |
| `ORDERS_API_URL` | URL base del servicio de órdenes |
| `SERVICE_JWT_TOKEN` | Token JWT de servicio para autenticación |

---

## 🧪 Ejecución local

### Opción 1: Con AWS SAM (simulación de Lambda real)
Asegúrate de tener [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) instalado.

1. Construye el proyecto:
   ```bash
   sam build
   ```

2. Inicia el API Gateway local (simula AWS Lambda HTTP):
   ```bash
   sam local start-api --docker-network caep-managment-store-jelou_default
   ```

3. Prueba el endpoint:
   ```bash
   curl -X POST http://127.0.0.1:3000/orchestrator/create-and-confirm-order      -H "Content-Type: application/json"      -d '{"customer_id":1,"items":[{"product_id":2,"qty":3}],"idempotency_key":"abc-123","correlation_id":"req-789"}'
   ```

---

## 🧩 Notas finales

- Compatible con **Node.js 20.x**
- Preparado para **AWS Lambda o ejecución local con SAM**
- Soporte de **idempotencia**, **correlation ID**, y comunicación segura JWT
