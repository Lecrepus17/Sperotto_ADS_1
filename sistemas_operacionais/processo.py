import random

class Processo:
    def __init__(self, pid, tempo_execucao, tipo):
        self.pid = pid
        self.tempo_restante = tempo_execucao
        self.tipo = tipo  # "CPU" ou "IO"
        self.tempo_total = tempo_execucao

    def executar(self, quantum):
        if self.tipo == "CPU":
            uso = quantum
        else:  # I/O bound usa menos que o quantum, de forma aleatória
            uso = random.randint(1, max(1, quantum // 2))

        if self.tempo_restante > uso:
            self.tempo_restante -= uso
            return uso
        else:
            uso = self.tempo_restante
            self.tempo_restante = 0
            return uso

    def finalizado(self):
        return self.tempo_restante == 0

    def __str__(self):
        return f"{self.pid} [{self.tipo}] - Tempo restante: {self.tempo_restante}"
