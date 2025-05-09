# 🧩 NestJS Microservices — User & Order Service

Bu layihə iki ayrı mikroservisdən ibarətdir:

- **User Service (Port: 8000)** — istifadəçi qeydiyyatı, giriş, JWT token yaradılması və yoxlanılması.
- **Order Service (Port: 8001)** — yalnız autentifikasiya olunmuş istifadəçilər üçün sifarişlərin yaradılması,silinməsi, yenilənməsi və siyahılanması.

Servislər **RabbitMQ** vasitəsilə bir-biri ilə əlaqə saxlayır.

Layihə tam olaraq Module struktur ilə yazılıb ( Controller, Service, Repository ) Layer

istifadə olunan Texnalogiyalar: NestJS PostgreSQL TypeORM JWT (JSON Web Token) RabbitMQ bcrypt  class-validator class-transformer dotenv Docker Docker Compose

Api Documentation ucun  Appi run etdikden sonra http://localhost:8000/api-docs vəya 8001 portun yazmaq kifayətdir.

Api run etmek ucun ise terminalda docker compose up --build komandasin calisdirmaq lazimdir. Run etmemisden evvel (env.example faylindaki keyleri (.env.local veya e.env) fayli yaradib tamamlamaq lazimdir . Prod ucun .env , Local ucun .env.local file. Eynisinde atsaniz calisacaq .
