import cors from 'cors';
import express from 'express';
import { JsonRepository } from './repositories/JsonRepository';
import { criarRotasEncomendas } from './routes/encomendaRoutes';
import { EncomendaService } from './services/EncomendaService';

const PORT = Number(process.env.PORT) || 3001;

const app = express();
app.use(cors());
app.use(express.json());

const repository = new JsonRepository();
const encomendaService = new EncomendaService(repository);

app.use('/api', criarRotasEncomendas(encomendaService));

app.listen(PORT, () => {
  console.log(`🚚 RotaFácil API rodando em http://localhost:${PORT}/api`);
});
