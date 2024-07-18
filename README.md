# Piano Practice Thing

A piano pratice app for connecting from phone to laptop for checking accuracy and finger training. Made with WebSockets and bloat.

## `.env` files

```dotenv
# server
PORT=...
```

```dotenv
# mobile & monitor
VITE_IP=<server ip>
VITE_PORT=...
```

## Running the thing

```bash
> cd server
server> node index.js --env-file=.env
```

```bash
> cd mobile
mobile> npm run dev
```

```bash
> cd monitor
monitor> npm run dev
```