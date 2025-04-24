class Processo:
    def __init__(self, pid, tempo_execucao):
        self.pid = pid
        self.tempo_restante = tempo_execucao

    def executar(self, quantum):
        if self.tempo_restante > quantum:
            self.tempo_restante -= quantum
            return quantum
        else:
            tempo_executado = self.tempo_restante
            self.tempo_restante = 0
            return tempo_executado

    def finalizado(self):
        return self.tempo_restante == 0

    def __str__(self):
        return f"Processo {self.pid} - Tempo restante: {self.tempo_restante}"
