from processo import Processo

class CPU:
    def __init__(self, quantum):
        self.quantum = quantum
        self.fila = []

    def adicionar_processo(self, processo):
        self.fila.append(processo)

    def executar(self):
        tempo_total = 0
        print("\n🔄 Iniciando escalonamento Round-Robin:\n")
        while self.fila:
            processo = self.fila.pop(0)
            print(f"⏳ Executando {processo}")
            tempo_executado = processo.executar(self.quantum)
            tempo_total += tempo_executado
            if not processo.finalizado():
                self.fila.append(processo)
            else:
                print(f"✅ {processo.pid} finalizado.")
        print(f"\n🕒 Tempo total de execução: {tempo_total} unidades de tempo")

# Exemplo de uso:
if __name__ == "__main__":
    cpu = CPU(quantum=1)
    cpu.adicionar_processo(Processo(pid="P1", tempo_execucao=10))
    cpu.adicionar_processo(Processo(pid="P2", tempo_execucao=4))
    cpu.adicionar_processo(Processo(pid="P3", tempo_execucao=7))
    cpu.executar()
